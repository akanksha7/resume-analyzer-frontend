import {LoginResponse } from '@/types/auth';
import axios from 'axios';

// const USER_ID = '1'; // This should come from auth context in a real app
const API_BASE_URL = "http://127.0.0.1:5000";

interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Verify Email
export const verifyEmail = async (email: string): Promise<APIResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-email`, { email });
    return response.data;
  } catch (error: any) {
    console.error("Error verifying email:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to send verification code");
  }
};

// Verify OTP
export const verifyOTP = async (email: string, otp: string): Promise<APIResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp });
    return response.data;
  } catch (error: any) {
    console.error("Error verifying OTP:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Invalid verification code");
  }
};
 

export const api = {
  getCatalogs: async (page = 1, limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/api/catalogs?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    console.log('Data:', localStorage.getItem('accessToken'));
    debugger;
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
};
