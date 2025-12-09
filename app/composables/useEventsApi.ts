export const useEventsApi = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiUrl || 'http://localhost:3001';

  const getEvents = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/events`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      if (data.success) {
        return data.data;
      } else {
        throw new Error('API returned error');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  };

  const getEventById = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/events/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      const data = await response.json();
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Event not found');
      }
    } catch (error) {
      console.error('Error fetching event by ID:', error);
      throw error;
    }
  };
  const getRemainingSpots = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/events/${id}/remaining`);
      if (!response.ok) {
        throw new Error('Failed to fetch getRemainingSpots');
      }
      const data = await response.json();

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || 'Event not found');
      }
    } catch (error) {
      console.error('Error fetching getRemainingSpots by ID:', error);
      throw error;
    }
  };
  return {
    getEvents,
    getEventById,
    getRemainingSpots,
  };
};
