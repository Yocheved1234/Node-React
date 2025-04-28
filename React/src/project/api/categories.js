import axios from "axios"
const baseUrl = `http://localhost:3000`

const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); // קבלת ה-token מה-localStorage
    return {
        headers: {
            Authorization: `Bearer ${token}`, // הוספת ה-token ל-header
        },
    };
};

export const getCategories = () => {
    return axios.get(`${baseUrl}/categories`)
}

export const postCategories = (newCategories) => {
    return axios.post(`${baseUrl}/categories`, newCategories,getAuthHeaders())
}

export const getApartCategories = (name) => {
    return axios.get(`${baseUrl}/categories/${name}`)
}