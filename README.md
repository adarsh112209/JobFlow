# JobFlow 

> **Streamline your job hunt. Track applications, manage interviews, and land your dream role.**


##  Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

##  About The Project

**JobFlow** is a comprehensive job application tracking system designed to help job seekers organize their search process. Moving beyond messy spreadsheets, JobFlow provides a centralized dashboard to visualize application statuses, store key details about companies, and never miss a follow-up deadline.

Whether you are applying for internships or full-time roles, JobFlow brings clarity to the chaos of job hunting.

##  Key Features

* **Kanban-Style Tracking:** Visualize applications by status (Applied, Interview, Offer, Rejected) with a drag-and-drop interface.
* **Application Management:** Store detailed information for each job including job description, salary, location, and application dates.
* **Company Insights:** Maintain a database of companies you are targeting or interviewing with.
* **Analytics Dashboard:** Gain insights into your progress with charts showing application stats and response rates.
* **Interview Scheduler:** (Optional: Add if applicable) Integrated calendar to manage upcoming interview dates.
* **Search & Filter:** Quickly find specific applications by company name, role, or status.
* **Responsive Design:** Fully functional on both desktop and mobile devices.

## 🛠 Tech Stack

**Frontend:**
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)


**Backend:**
* ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
* ![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

**Database:**
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

**Tools & DevOps:**
* ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
* ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

##  Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

* **Node.js** (v14 or higher)
* **npm** or **yarn**
* **MongoDB** (Local instance or Atlas URI)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/adarsh112209/JobFlow.git
    cd JobFlow
    ```

2.  **Install Frontend Dependencies**
    ```bash
    cd client
    npm install
    ```

3.  **Install Backend Dependencies**
    ```bash
    cd ../server
    npm install
    ```

4.  **Configure Environment Variables**
    Create a `.env` file in the `server` directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

5.  **Run the Project**
    * **Backend:** `npm start` (inside server folder)
    * **Frontend:** `npm start` (inside client folder)

    The app should now be running on `http://localhost:3000`.

---

##  Usage

1.  **Sign Up/Login:** Create an account to access your private dashboard.
2.  **Add a Job:** Click the "Add Job" button and fill in the details (Company, Position, Status).
3.  **Track Progress:** Move jobs across different stages (Applied -> Interview -> Offer) as you progress.
4.  **Analyze:** Check the "Stats" tab to see your weekly application counts.

---

##  Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

##  Contact

**Adarsh Tiwari**

* **Email:** adarshpandat100@gmail.com
* **LinkedIn:** [Adarsh Tiwari](http://www.linkedin.com/in/adarsh-tiwari-9141a2275)
* **GitHub:** [adarsh112209](https://github.com/adarsh112209)

Project Link: https://job-flow-in.vercel.app
