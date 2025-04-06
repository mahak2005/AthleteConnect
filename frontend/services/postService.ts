import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      return Promise.reject(new Error('No response received from server'));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      return Promise.reject(new Error('Failed to make request'));
    }
  }
);

export const createPost = async (content: string, image?: string) => {
  try {
    console.log('Creating post with:', { content, image });
    const response = await api.post('/posts', { content, image });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const likePost = async (postId: string) => {
  try {
    const response = await api.put(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const addComment = async (postId: string, content: string) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}; 