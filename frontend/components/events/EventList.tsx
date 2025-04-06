import React, { useState, useEffect } from 'react';
import { eventService, Event } from '@/services/eventService';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { EventRegistrationForm } from './EventRegistrationForm';

interface EventListProps {
  refreshTrigger?: number;
}

export const EventList: React.FC<EventListProps> = ({ refreshTrigger = 0 }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [refreshTrigger]);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = (eventId: string, eventName: string) => {
    setSelectedEvent({ id: eventId, name: eventName });
  };

  const handleCloseRegistration = () => {
    setSelectedEvent(null);
  };

  const handleRegistrationSuccess = () => {
    fetchEvents(); // Refresh the events list
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {events.map((event) => (
        <div key={event._id} className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-600 mt-2">{event.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">
                    {event.isOnline ? 'Online Event' : event.location}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Organized by</p>
                <div className="flex items-center mt-1">
                  {event.organizer.image && (
                    <Image
                      src={event.organizer.image}
                      alt={event.organizer.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span className="ml-2 font-medium">{event.organizer.name}</span>
                </div>
              </div>

              {event.attendees.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Attendees</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {event.attendees.map(attendee => (
                      <div key={attendee._id} className="flex items-center">
                        {attendee.image && (
                          <Image
                            src={attendee.image}
                            alt={attendee.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        )}
                        <span className="ml-2 text-sm">{attendee.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Attendees</p>
                  <p className="font-medium">
                    {event.currentAttendees} / {event.maxAttendees}
                  </p>
                </div>
                <button
                  onClick={() => handleRegisterClick(event._id, event.name)}
                  disabled={event.currentAttendees >= event.maxAttendees}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {events.length === 0 && (
        <div className="col-span-2 text-center py-12">
          <p className="text-gray-500">No events found</p>
        </div>
      )}

      {selectedEvent && (
        <EventRegistrationForm
          eventId={selectedEvent.id}
          eventName={selectedEvent.name}
          onClose={handleCloseRegistration}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      )}
    </div>
  );
}; 