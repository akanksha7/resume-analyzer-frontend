const API_BASE_URL = "http://127.0.0.1:5000";

import axios from 'axios';

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

// Add Catalog
export const addCatalog = async (): Promise<APIResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/jobs`, {
      jobTitle: "New Job",
      company: "Example Company",
    });
    return response.data;
  } catch (error: any) {
    console.error("Error adding catalog:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to add catalog");
  }
};
 
//  export const verifyEmail = async (email: string): Promise<APIResponse> => {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1000));
 
//   if (email.includes('@') && email.includes('.')) {
//     return {
//       success: true,
//       message: 'Verification code sent',
//       data: { email }
//     };
//   }
 
//   throw new Error('Invalid email address');
//  };
 
//  export const verifyOTP = async (email: string, otp: string): Promise<APIResponse> => {
//   await new Promise(resolve => setTimeout(resolve, 1000));
 
//   if (otp === '123456') {
//     return {
//       success: true,
//       message: 'Email verified successfully',
//       data: { email, verified: true }
//     };
//   }
 
//   throw new Error('Invalid verification code');
//  };