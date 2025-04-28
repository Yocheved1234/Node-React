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


export const getAdvertiser = () => {
    return axios.get(`${baseUrl}/advertiser`)
}

export const postAdvertiser = (newAdvertiser) => {
    return axios.post(`${baseUrl}/advertiser`, newAdvertiser)
}

export const getAdvertiserById = (id) => {
    return axios.get(`${baseUrl}/advertiser/getbyid/${id}`)
}

export const getAdvertiserByMailCode = (formData) => {
    return axios.post(`${baseUrl}/advertiser/bymail`, { email: formData.email, phone: formData.phone });
}