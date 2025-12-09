export const useReservation = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiUrl || 'http://localhost:3001';

  const submit = async (payload: any) => {
    try {
      const res = await $fetch(`${baseUrl}/api/reservations`, {
        method: 'POST',
        body: payload,
      });

      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { submit };
};
