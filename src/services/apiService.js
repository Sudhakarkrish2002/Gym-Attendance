// Auto-detect API URL based on environment
const getApiBaseUrl = () => {
  // If VITE_API_URL is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // If running on Vercel or production, you need to set VITE_API_URL
  // For local development, use localhost
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If accessing from localhost, use localhost API
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
    
    // If accessing from network IP, try to use the same IP for API
    // This assumes your laptop's IP is accessible
    // You'll need to set VITE_API_URL environment variable in Vercel
    return `http://${hostname}:5000/api`;
  }
  
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchRecords = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/records`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching records:', error);
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on port 5000.');
    }
    throw error;
  }
};

export const createRecord = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating record:', error);
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on port 5000.');
    }
    throw error;
  }
};

export const deleteRecord = async (timestamp) => {
  try {
    const response = await fetch(`${API_BASE_URL}/records/${timestamp}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};

export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await handleResponse(response);
  } catch (error) {
    return { status: 'error', message: 'Server not available' };
  }
};

