import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/submissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Submissions Dashboard</h2>
      <ul className="submission-list">
        {submissions.map((submission) => (
          <li key={submission._id} className="submission-item">
            <h3>{submission.name}</h3>
            <p>Handle: {submission.handle}</p>
            <div className="image-container">
              {submission.images.map((image, index) => (
                <img key={index} src={`${process.env.REACT_APP_API_URL}${image}`} alt={`Submission ${index + 1}`} />
              ))}
            </div>
            <button onClick={() => handleDelete(submission._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

