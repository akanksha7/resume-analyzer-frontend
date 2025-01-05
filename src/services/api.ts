import {LoginResponse } from '@/types/auth';
import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:5000";

interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Verify Email
export const verifyEmail = async (email: string): Promise<APIResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/verify-email-request`, { email });
    return response.data;
  } catch (error: any) {
    console.error("Error verifying email:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to send verification code");
  }
};

export const registerEmail = async (email: string, password: string, plan_type: string): Promise<APIResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { email, password, plan_type });
    return response.data;
  } catch (error: any) {
    console.error("Error verifying email:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to send verification code");
  }
};

// Verify OTP
export const verifyOTP = async (email: string, otp_code: string): Promise<APIResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/verify-email`, { email, otp_code });
    return response.data;
  } catch (error: any) {
    console.error("Error verifying OTP:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Invalid verification code");
  }
};
 

export const api = {
  getCatalogs: async (page = 1, limit = 10) => {
    console.log(`${API_BASE_URL}/api/catalogs?page=${page}&limit=${limit}`);
    console.log(`Bearer ${localStorage.getItem('accessToken')}`);
    const response = await fetch(`${API_BASE_URL}/api/catalogs?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.json();
  },

  getJobDescriptions: async (catalogId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/catalogs/${catalogId}/job-descriptions`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.json();
  },
  createCatalog: async (name: string, description: string) => {
    const response = await fetch(`${API_BASE_URL}/api/catalogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ name, description }),
    });
    return response.json();
  },

  createJobDescription: async (catalogId: string, title: string, description: string) => {
    const response = await fetch(`${API_BASE_URL}/api/catalogs/${catalogId}/job-descriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ title, description, catalog_id: catalogId }),
    });
    return response.json();
  },

  uploadResumes: async (catalogId: string, files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/api/catalogs/${catalogId}/resumes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    });
    return response.json();
  },
  login: async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid credentials');
    }

    return response.json();
  },

  deleteJob: async (catalogId: string, jobId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/catalogs/${catalogId}/job-descriptions/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete job');
    }

    return response.json();
  },

  updateJob: async (catalog_id: string, job_description_id: string, data: { title: string; description: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/catalogs/${catalog_id}/job-descriptions/${job_description_id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update job');
    }

    return response.json();
  },
};
