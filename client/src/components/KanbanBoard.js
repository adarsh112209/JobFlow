    import React, { useContext } from 'react';
    import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
    import axios from 'axios';
    import AuthContext from '../context/AuthContext';

    const KanbanBoard = ({ applications, onCardClick, refreshApplications }) => {
      const { userInfo } = useContext(AuthContext);

      if (!Array.isArray(applications)) {
        return <div>Loading applications...</div>;
      }

      const handleOnDragEnd = async (result) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
          return;
        }

        const draggedApp = applications.find(app => app._id === draggableId);
        try {
          const config = {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` },
          };
          await axios.put(
            `/api/applications/${draggableId}`,
            { ...draggedApp, status: destination.droppableId },
            config
          );
          refreshApplications();
        } catch (error) {
          console.error('Failed to update application status', error);
        }
      };
      
      const columns = {
        Wishlist: applications.filter(app => app.status === 'Wishlist'),
        Applied: applications.filter(app => app.status === 'Applied'),
        'Online Assessment': applications.filter(app => app.status === 'Online Assessment'),
        Interview: applications.filter(app => app.status === 'Interview'),
        Offer: applications.filter(app => app.status === 'Offer'),
        Rejected: applications.filter(app => app.status === 'Rejected'),
      };

      return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="kanban-grid-container">
            <div className="kanban-row">
              {Object.entries(columns).slice(0, 3).map(([columnId, columnApps]) => (
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
                                <h4>{app.companyName}</h4>
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
              ))}
            </div>
            <div className="kanban-row">
              {Object.entries(columns).slice(3, 6).map(([columnId, columnApps]) => (
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
                                <h4>{app.companyName}</h4>
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
              ))}
            </div>
          </div>
        </DragDropContext>
      );
    };

    export default KanbanBoard;
    