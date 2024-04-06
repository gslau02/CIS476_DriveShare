import axios from 'axios';

const API_URL = 'http://localhost:3001/car';

export const listCarForRent = async (carData) => {
    try {
        const response = await axios.post(`${API_URL}/listCarForRent`, carData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAllCars = async () => {
    try {
        const response = await axios.get(`${API_URL}/fetchAllCars`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const fetchSingleCar = async (carId) => {
    try {
        const response = await axios.get(`${API_URL}/${carId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}