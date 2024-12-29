const API_BASE_URL = "http://localhost:5177";

interface APIResponse {
 success: boolean;
 message: string;
 data?: any;
}

// export const verifyEmail = async (email: string): Promise<APIResponse> => {
//  const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
//    method: 'POST',
//    headers: { 'Content-Type': 'application/json' },
//    body: JSON.stringify({ email })
//  });
 
//  if (!response.ok) {
//    const error = await response.json();
//    throw new Error(error.message || 'Failed to send verification code');
//  }
 
//  return response.json();
// };

// export const verifyOTP = async (email: string, otp: string): Promise<APIResponse> => {
//  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
//    method: 'POST',
//    headers: { 'Content-Type': 'application/json' },
//    body: JSON.stringify({ email, otp })
//  });

//  if (!response.ok) {
//    const error = await response.json();
//    throw new Error(error.message || 'Invalid verification code');
//  }

//  return response.json();
// };

interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
 }
 
 export const verifyEmail = async (email: string): Promise<APIResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
 
  if (email.includes('@') && email.includes('.')) {
    return {
      success: true,
      message: 'Verification code sent',
      data: { email }
    };
  }
 
  throw new Error('Invalid email address');
 };
 
 export const verifyOTP = async (email: string, otp: string): Promise<APIResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
 
  if (otp === '123456') {
    return {
      success: true,
      message: 'Email verified successfully',
      data: { email, verified: true }
    };
  }
 
  throw new Error('Invalid verification code');
 };