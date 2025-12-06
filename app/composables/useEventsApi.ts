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
  return {
    getEvents,
  };
};
