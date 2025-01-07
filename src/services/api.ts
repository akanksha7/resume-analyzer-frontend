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

export const registerEmail = async (email: string, password: string): Promise<APIResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Error in registration:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Registration failed");
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

  getResumes: async (catalogId: string, jobDescriptionId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/catalogs/${catalogId}/resumes?job_description_id=${jobDescriptionId}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch resumes');
    }
  
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
  getPlans: async () => {
    const response = await fetch(`${API_BASE_URL}/api/plans`);
    return response.json();
  },

  analyzeBatchResumes: async (jobDescriptionId: string, resumeIds: string[]) => {
    const response = await fetch(`${API_BASE_URL}/api/analyze/batch`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job_description_id: jobDescriptionId,
        resume_ids: resumeIds
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to start batch analysis');
    }

    return response.json();
  },
  getResumeAnalysis: async (resumeId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/resumes/${resumeId}/analysis`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch resume analysis');
    }

    return response.json();
  },
  deleteResume: async (catalog_id: string, resume_id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/catalogs/${catalog_id}/resumes/${resume_id} `, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete resume');
    }

    return response.json();
  },
  refreshToken: async (refresh_token: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return response.json();
  },

  createCheckoutSession: async (planId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ planId }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    return response.json();
  },

  getCheckoutSession: async (sessionId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/session-status?session_id=${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get session status');
    }

    return response.json();
  },
};
