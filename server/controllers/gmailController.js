const { google } = require('googleapis');
const { simpleParser } = require('mailparser');
const User = require('../models/User');
const Application = require('../models/Application');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Corrected to a valid, powerful model
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const analyzeGmail = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.googleRefreshToken) {
      return res.status(400).json({ message: 'Gmail not connected for this user.' });
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'http://localhost:5000/api/auth/google/callback'
    );
    oauth2Client.setCredentials({ refresh_token: user.googleRefreshToken });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'in:inbox newer_than:1d',
      maxResults: 5
    });

    const messages = response.data.messages;

    if (!messages || messages.length === 0) {
      return res.status(200).json({ message: 'No new emails found in the last 24 hours.' });
    }

    let processedCount = 0;
    let eligibleCount = 0;

    for (const message of messages) {
      const msg = await gmail.users.messages.get({ userId: 'me', id: message.id, format: 'raw' });
      const rawEmail = Buffer.from(msg.data.raw, 'base64').toString('utf-8');
      const parsedEmail = await simpleParser(rawEmail);
      const emailText = parsedEmail.text || '';

      // Updated prompt with correct status values
      const prompt = `
        You are a powerful email classification AI working for a student job application dashboard. Your goal is to analyze email content and determine if the mail is job-related, whether the user meets the eligibility, and which column the mail should be categorized under in the Kanban-style dashboard.

        You MUST follow this step-by-step logic strictly:

        ---

        ### STEP 1: Is the mail JOB-RELATED?

        Check if the mail is about:
        - Job offer
        - Interview invitation or schedule
        - Online assessment (aptitude, coding, MCQ, platform link)
        - Application confirmation or updates
        - Hiring drive announcements
        - Company recruitment communication

        If NO, return this exact JSON (no explanation):
        **{ "isJobRelated": false }**

        ---

        ### STEP 2: CLASSIFY the mail into the right Kanban column

        If the mail is job-related and eligible, extract and classify it into **ONE** of the following 6 statuses:

        1. **"Offer"**
        - The candidate has been selected for a role
        - Job/internship offer letter is mentioned but should not contain name of any person other than the name of the person in profile
        - Mail includes congratulatory phrases or attached offer
        - **Keywords:** “We are pleased to offer”, “Congratulations”, “You have been selected”, “Offer attached”, “Placement offer”
        
        2. **"Interview"**
        - Mail is about any interview round (technical, HR, managerial)
        - Includes scheduling link, interview date/time
        - **Keywords:** “Interview”, “Schedule a call”, “Round”, “Discussion with panel”, “Next step: interview”

        3. **"Online Assessment"**
        - Mail is about a test (coding, aptitude, MCQ, psychometric, etc.)
        - Includes platform link, duration, deadline, or result instructions
        - **Keywords:** “Assessment”, “Online test”, “Link to test”, “HackerRank”, “Coding round”, “Quiz portal”

        4. **"Rejected"**
        - Mail conveys regret or non-selection
        - No next steps mentioned
        - **Keywords:** “Unfortunately”, “We regret to inform”, “Not selected”, “Thank you for participating”
        
        5. **"Applied"**
        - Mail confirms application receipt
        - No action required yet, no results/assessments
        - **Keywords:** “Thank you for applying”, “Application received”, “Submission confirmed”

        6. **"Wishlist"**
        - Informational mail only; company is hiring or announcing roles
        - No application submitted by user yet
        - Encourages user to apply
        - **Keywords:** “We are hiring”, “Apply now”, “Job opening”, “Drive details”, “Open roles”, “Interested candidates”
        ---

        ### STEP 3: Extract Fields

        If job-related AND eligible, return this **exact JSON structure**:

        {
        "isJobRelated": true,
        "isEligible": true,
        "companyName": "Company Name",
        "status": "Interview", // one of the 6 statuses above
        "applicationDeadline": "YYYY-MM-DD" or null,
        "assessmentDate": "YYYY-MM-DD" or null
        }

        Dates must be in **YYYY-MM-DD** format or use null if not provided.

        ---

        ONLY RETURN JSON. DO NOT explain your answer.  
        Now, analyze the email below and respond in JSON format only.

        Email Subject: "${parsedEmail.subject}"
        Email Body: "${emailText.substring(0, 4000)}"
      `;

      const result = await model.generateContent(prompt);
      const aiResponse = await result.response;
      const aiText = aiResponse.text();

      const jsonResponse = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
      const analysisResult = JSON.parse(jsonResponse);

      if (analysisResult && analysisResult.isJobRelated) {
        processedCount++;
        if (analysisResult.isEligible) {
          eligibleCount++;
          const updateData = {
            role: parsedEmail.subject,
            status: analysisResult.status,
            notes: `Analyzed by Gemini. Subject: ${parsedEmail.subject}`,
          };
          if (analysisResult.applicationDeadline) updateData.applicationDeadline = new Date(analysisResult.applicationDeadline);
          if (analysisResult.assessmentDate) updateData.assessmentDate = new Date(analysisResult.assessmentDate);

          await Application.findOneAndUpdate(
            { user: user._id, companyName: analysisResult.companyName },
            { $set: updateData },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );
        }
      }
    }

    res.status(200).json({ message: `Scan complete. Found ${processedCount} job emails, ${eligibleCount} were for B.Tech/CSE and have been updated.` });

  } catch (error) {
    console.error('Error analyzing Gmail with Gemini:', error);
    res.status(500).json({ message: 'Failed to analyze Gmail with Gemini.' });
  }
};

module.exports = { analyzeGmail };