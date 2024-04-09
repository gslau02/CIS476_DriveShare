import axios from 'axios';

const API_URL = 'http://localhost:3001/car';

// Listing car for rental function
export const listCarForRent = async (carData) => {
    try {
      // POST request to list car for rent
        const response = await axios.post(`${API_URL}/listCarForRent`, carData);
        localStorage.setItem('isCarOwner', true);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch all cars function
export const fetchAllCars = async (searchParams) => {
  try {
    // Create URL to fetch all cars
    let url = `${API_URL}/fetchAllCars`;
    // Append search parameters to URL
    if (searchParams) {
      url += `?${new URLSearchParams(searchParams).toString()}`;
    }
    // GET request to fetch all cars
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single car (using carId) function
export const fetchSingleCar = async (carId) => {
    try {
      // GET request to fetch a single car
        const response = await axios.get(`${API_URL}/${carId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
