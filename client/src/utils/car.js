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

// Function to fetch the user's car listings
export const getUserCarListings = async () => {
    try {
        const response = await axios.get(`${API_URL}/listUserCarListings`);
        return response.data;
    } catch (error) {
        throw error;
    }
};