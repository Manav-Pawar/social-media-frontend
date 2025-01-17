'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SubmissionForm() {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('handle', handle);
      
      // Append each file to the FormData
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });

      await axios.post(`${process.env.REACT_APP_API_URL}/api/submissions`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Submission successful!');
      setName('');
      setHandle('');
      setFiles([]);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload');
      if (fileInput) fileInput.value = '';

    } catch (err) {
      setError(err.response?.data?.error || 'Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">User Submission Form</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="handle" className="block text-sm font-medium text-gray-700 mb-1">
            Social Media Handle:
          </label>
          <input
            id="handle"
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Images:
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setFiles(e.target.files)}
            multiple
            accept="image/*"
            required
            className="w-full"
          />
          <p className="mt-1 text-sm text-gray-500">
            You can select multiple images
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Link to Admin Login */}
      <div className="mt-6 text-center">
        <p className="text-sm">
          Want to access the Admin Dashboard?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Go to Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
}
