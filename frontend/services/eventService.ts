import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  maxAttendees: number;
  currentAttendees: number;
  organizer: {
    _id: string;
    name: string;
    image?: string;
  };
  attendees: Array<{
    _id: string;
    name: string;
    image?: string;
  }>;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isOnline?: boolean;
  maxAttendees: number;
}

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  additionalInfo?: string;
}

export const eventService = {
  async createEvent(data: CreateEventData): Promise<Event> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      console.log('Creating event with data:', data);
      const response = await axios.post(`${API_URL}/events`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Event created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Failed to create event');
      }
      throw error;
    }
  },

  async getAllEvents(): Promise<Event[]> {
    try {
      console.log('Fetching all events');
      const response = await axios.get(`${API_URL}/events`);
      console.log('Events fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Failed to fetch events');
      }
      throw error;
    }
  },

  async registerForEvent(eventId: string, data: RegistrationData): Promise<Event> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await axios.post(
        `${API_URL}/events/${eventId}/register`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to register for event');
      }
      throw error;
    }
  }
}; 