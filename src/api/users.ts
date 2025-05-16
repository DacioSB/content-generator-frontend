import axios from 'axios';

export const createBackendUser = async (clerkToken: string) => {
  try {
    await axios.post('https://your-aspnet-api.com/api/users/sync', {}, {
      headers: {
        Authorization: `Bearer ${clerkToken}`
      }
    });
  } catch (error) {
    console.error('Error syncing user with backend:', error);
  }
};