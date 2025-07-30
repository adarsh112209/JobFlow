import React, { useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

// Helper function to format time in a user-friendly way
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "just now";
};

const KanbanBoard = ({ applications, onCardClick, refreshApplications }) => {
  const { userInfo } = useContext(AuthContext);

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const draggedApp = applications.find(app => app._id === draggableId);
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`/api/applications/${draggableId}`, { ...draggedApp, status: destination.droppableId }, config);
      refreshApplications();
    } catch (error) {
      console.error('Failed to update application status', error);
    }
  };

  // --- SPLIT COLUMNS INTO TWO ROWS ---
  const columnsTopRow = {
    Wishlist: applications.filter(app => app.status === 'Wishlist'),
    Applied: applications.filter(app => app.status === 'Applied'),
    'Online Assessment': applications.filter(app => app.status === 'Online Assessment'),
  };

  const columnsBottomRow = {
    Interview: applications.filter(app => app.status === 'Interview'),
    Offer: applications.filter(app => app.status === 'Offer'),
    Rejected: applications.filter(app => app.status === 'Rejected'),
  };

  // Helper function to render a row of columns
  const renderColumns = (columns) => {
    return Object.entries(columns).map(([columnId, columnApps]) => {
      return (
        <Droppable droppableId={columnId} key={columnId}>
          {(provided) => (
            <div className="kanban-column" {...provided.droppableProps} ref={provided.innerRef}>
              <h3>{columnId} ({columnApps.length})</h3>
              <div className="kanban-column-body">
                {columnApps.map((app, index) => (
                  <Draggable key={app._id} draggableId={app._id} index={index}>
                    {(provided) => (
                      <div
                        className="kanban-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => onCardClick(app)}
                      >
                        <div className="card-header">
                          <h4>{app.companyName}</h4>
                          <p className="card-time">{formatTimeAgo(app.updatedAt)}</p>
                        </div>
                        <p>{app.role}</p>
                        <div className="card-dates">
                          <p className="card-date">
                            <strong>Last date of registration:</strong> {app.applicationDeadline ? new Date(app.applicationDeadline).toLocaleDateString() : 'Not set'}
                          </p>
                          <p className="card-date">
                            <strong>Test Date:</strong> {app.assessmentDate ? new Date(app.assessmentDate).toLocaleDateString() : 'Not set'}
                          </p>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      );
    });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="kanban-grid-container">
        <div className="kanban-row">
          {renderColumns(columnsTopRow)}
        </div>
        <div className="kanban-row">
          {renderColumns(columnsBottomRow)}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;