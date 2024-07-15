import axios from 'axios';

export const getUserRecommendations = async (userId: string): Promise<string[]> => {
  try {
    const response = await axios.get(`/api/recommendations/${userId}`);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
