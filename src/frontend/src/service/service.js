import axios from "axios";

export const testBackend = async () => {
    return axios.get('/api/test');
}

export const fetchRequests = async () => {
    return axios.get('/api/request/');
}