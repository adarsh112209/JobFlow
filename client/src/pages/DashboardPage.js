    import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
    import axios from 'axios';
    import { toast } from 'react-toastify';
    import Navbar from '../components/Navbar';
    import AuthContext from '../context/AuthContext';
    import KanbanBoard from '../components/KanbanBoard';
    import Modal from '../components/Modal';
    import ApplicationForm from '../components/ApplicationForm';
    import ConfirmationModal from '../components/ConfirmationModal';
    import API from '../api'; 
    const DashboardPage = () => {
      const [applications, setApplications] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingApplication, setEditingApplication] = useState(null);
      const [isScanning, setIsScanning] = useState(false);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const { userInfo } = useContext(AuthContext);
      
      const scanAbortController = useRef(null);

      const refreshApplications = useCallback(async () => {
        if (!userInfo) return;
        try {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await API.get('/api/applications', config);
          setApplications(data);
        } catch (error) {
          console.error('Could not re-fetch applications', error);
          toast.error('Could not fetch your applications.');
        }
      }, [userInfo]);

      useEffect(() => {
        if (userInfo) {
          refreshApplications();
        }
      }, [userInfo, refreshApplications]);

      const closeModal = () => {
        setIsModalOpen(false);
        setEditingApplication(null);
      };

      const handleOpenAddModal = () => {
        setEditingApplication(null);
        setIsModalOpen(true);
      };

      const handleCardClick = (application) => {
        setEditingApplication(application);
        setIsModalOpen(true);
      };

      const handleAddApplication = async (formData) => {
        try {
          const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
          await API.post('/api/applications', formData, config);
          closeModal();
          refreshApplications();
          toast.success('Application Added!');
        } catch (error) {
          toast.error('Failed to add application');
        }
      };

      const handleEditApplication = async (formData) => {
        try {
          const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
          await API.put(`/api/applications/${editingApplication._id}`, formData, config);
          closeModal();
          refreshApplications();
          toast.success('Application Updated!');
        } catch (error) {
          toast.error('Failed to edit application');
        }
      };
      
      const handleDeleteApplication = () => {
        setIsDeleteModalOpen(true);
      };

      const confirmDeleteHandler = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          await API.delete(`/api/applications/${editingApplication._id}`, config);
          setIsDeleteModalOpen(false);
          closeModal();
          refreshApplications();
          toast.success('Application Deleted');
        } catch (error) {
          toast.error('Failed to delete application');
        }
      };

      const handleScanGmail = async () => {
        scanAbortController.current = new AbortController();
        setIsScanning(true);
        try {
          const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
            signal: scanAbortController.current.signal,
          };
          const { data } = await API.post('/api/gmail/analyze', {}, config);
          toast.info(data.message);
          refreshApplications();
        } catch (error) {
          if (axios.isCancel(error)) {
            toast.warn('Gmail scan was cancelled.');
          } else {
            toast.error('Failed to scan Gmail. See console for details.');
          }
        }
        setIsScanning(false);
      };

      const handleStopScan = () => {
        if (scanAbortController.current) {
          scanAbortController.current.abort();
        }
      };

      return (
        <div>
          <Navbar 
            onScanGmail={handleScanGmail}
            onStopScan={handleStopScan}
            onOpenAddModal={handleOpenAddModal}
            isScanning={isScanning}
          />
          <div className="dashboard-content">
            <KanbanBoard 
              applications={applications} 
              onCardClick={handleCardClick}
              refreshApplications={refreshApplications}
            />
          </div>
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <h2>{editingApplication ? `Edit ${editingApplication.status}` : 'Add New Application'}</h2>
              <ApplicationForm 
                onSubmit={editingApplication ? handleEditApplication : handleAddApplication}
                onCancel={closeModal}
                initialData={editingApplication}
              />
              {editingApplication && (
                <button onClick={handleDeleteApplication} className="btn-delete">Delete</button>
              )}
            </Modal>
          )}
          {isDeleteModalOpen && (
            <ConfirmationModal
              message="Are you sure you want to delete this application?"
              onConfirm={confirmDeleteHandler}
              onCancel={() => setIsDeleteModalOpen(false)}
            />
          )}
        </div>
      );
    };

    export default DashboardPage;
    