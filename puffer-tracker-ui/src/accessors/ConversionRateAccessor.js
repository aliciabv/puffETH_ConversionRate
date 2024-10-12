import axios from 'axios';

export const fetchConversionRates = async (startDate, endDate) => {
  try {
    const response = await axios.get('http://localhost:8000/conversion-rate/', {
      params: {
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
      },
    });
    return response.data.conversion_rates;
  } catch (error) {
    console.error("Error fetching conversion rates:", error);
    throw error; // Propagate the error
  }
};
