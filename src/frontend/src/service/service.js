import axios from "axios";

export const testBackend = async () => {
    return axios.get('/api/test');
}

export const fetchRequests = async (user) => {
    return axios.get('/api/request?user=' + user);
}