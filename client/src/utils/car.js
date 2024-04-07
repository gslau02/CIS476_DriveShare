import axios from 'axios';

const API_URL = 'http://localhost:3001/car';

export const listCarForRent = async (carData) => {
    try {
        const response = await axios.post(`${API_URL}/listCarForRent`, carData);
        localStorage.setItem('isCarOwner', true);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAllCars = async (searchParams) => {
  try {
    let url = `${API_URL}/fetchAllCars`;
    if (searchParams) {
      url += `?${new URLSearchParams(searchParams).toString()}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSingleCar = async (carId) => {
    try {
        const response = await axios.get(`${API_URL}/${carId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
