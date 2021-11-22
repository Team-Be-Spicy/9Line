import axios from "axios";

export const testBackend = async () => {
    return axios.get('/api/test');
}

export const submitForm = async (formData) => {
    return axios.post('/api/request', formData);
}

export const fetchRequests = async () => {
    return axios.get('/api/request/');
}