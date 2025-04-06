import { API_URL } from '../config';

export const api = {
  // Auth endpoints
  login: `${API_URL}/api/auth/login`,
  register: `${API_URL}/api/auth/register`,
  forgotPassword: `${API_URL}/api/auth/forgot-password`,
  resetPassword: `${API_URL}/api/auth/reset-password`,

  // Athlete endpoints
  athleteProfile: `${API_URL}/api/athlete/profile`,
  updateAthlete: `${API_URL}/api/athlete/update`,
  uploadImage: `${API_URL}/api/athlete/upload-image`,

  // Coach endpoints
  coaches: `${API_URL}/api/coaches`,
  coachProfile: (id: string) => `${API_URL}/api/coaches/${id}`,

  // Match endpoints
  smartMatch: `${API_URL}/api/match/smart-match`,
};

export const fetchAPI = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}; 