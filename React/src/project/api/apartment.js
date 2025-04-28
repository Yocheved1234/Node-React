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


export const getApartment = () => {
    return axios.get(`${baseUrl}/apartment`)
}

export const priceMin = (price) => {
    return axios.get(`${baseUrl}/apartment/getWhere9/${price}`)
}

export const priceMax = (price) => {
    return axios.get(`${baseUrl}/apartment/getWhere7/${price}`)
}

export const bedMin = (num) => { 
    return axios.get(`${baseUrl}/apartment/getWhere6/${num}`)
}

export const bedMax = (num) => {
    return axios.get(`${baseUrl}/apartment/getWhere4/${num}`)
}

export const postApartment = (newApartment) => {    
    return axios.post(`${baseUrl}/apartment`, newApartment,getAuthHeaders())
}

export const patchApartment = (id, newApartment) => {
    return axios.patch(`${baseUrl}/apartment/${id}`, newApartment,getAuthHeaders() )
}

export const deleteApartment = (id) => {
    return axios.delete(`${baseUrl}/apartment/${id}`,getAuthHeaders())
}