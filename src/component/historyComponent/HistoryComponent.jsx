import React, { useState, useEffect } from 'react';
import './HistoryComponent.css';

const HistoryComponent = () => {
  const [auditTrails, setAuditTrails] = useState([]);
  const [error, setError] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchAuditTrails = async () => {
      try {
        const baseUrl = 'http://127.0.0.1:8000/api';
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`${baseUrl}/audit-trails`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch audit trails: ${response.status}`);
        }

        const data = await response.json();
        setAuditTrails(data.data || data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching audit trails:', err);
      }
    };

    fetchAuditTrails();
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h3 className="history-title">Audit Trail History</h3>
        <button onClick={toggleCollapse} className="collapse-button">
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className={`history-list ${isCollapsed ? 'collapsed' : ''}`}>
        {auditTrails.length > 0 ? (
          auditTrails.map((trail) => (
            <div key={trail.id} className="history-item">
              <p><strong>Action:</strong> {trail.action}</p>
              <p><strong>Resource:</strong> {trail.resource}</p>
              <p><strong>Details:</strong> {trail.details}</p>
              <p><strong>Date:</strong> {new Date(trail.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No audit trails available.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryComponent;