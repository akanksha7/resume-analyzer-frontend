import {LoginResponse } from '@/types/auth';
import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:5000";

interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface ResetPasswordData {
  email: string;
  otp_code: string;
  new_password: string;
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

// export const analyzeBatchResumes = async (jobId: string, resumeIds: string[]): Promise<void> => {
//   console.log('Calling analyzeBatchResumes with:', { jobId, resumeIds }); 
  
//   try {
//     const token = localStorage.getItem('access_token');
    
//     const response = await fetch(`${API_BASE_URL}/api/analyze/batch`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         job_description_id: jobId,
//         resume_ids: resumeIds
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       console.error('Error response:', errorData);
//       throw new Error(errorData?.message || 'Failed to start analysis');
//     }

//     const data = await response.json();
//     console.log('Analysis response:', data);
//     return data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

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

  getResumes: async (catalog_id: string, job_description_id: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/catalogs/${catalog_id}/resumes?job_description_id=${job_description_id}`,
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

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/api/stats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stats');
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


  getResumeAnalysis: async (job_description_id: string, resume_id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/jobs/${job_description_id}/resumes/${resume_id}/analysis`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch resume analysis');
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
      body: JSON.stringify({ refresh_token: refresh_token }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return response.json();
  },

  createCheckoutSession: async (planId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/payment/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ plan_id: planId,
        quantity: 1
       }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    return response.json();
  },

  getCheckoutSession: async (sessionId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/payment/session-status?session_id=${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get session status');
    }

    return response.json();
  },

  requestPasswordReset: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/reset-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to request password reset');
    }

    return response.json();
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to reset password');
    }

    return response.json();
  },
};
