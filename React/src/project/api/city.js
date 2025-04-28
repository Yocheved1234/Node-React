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


export const getCity = () => {
    return axios.get(`${baseUrl}/city`)
}

export const postCity = (newCity) => {
    return axios.post(`${baseUrl}/city`, newCity,getAuthHeaders())
}


export const getApart = (name) => {
    return axios.get(`${baseUrl}/city/${name}`)
}