import axios from 'axios';

export const fetchConversionRatesStatistics = async (startDate, endDate) => {
  try {
    const response = await axios.get('http://localhost:8000/conversion-rate/statistics', {
      params: {
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching conversion rates:", error);
    throw error; // Propagate the error
  }
}; 
