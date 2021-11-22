import axios from "axios";

export const testBackend = async () => {
    return await axios.get('/api/test');
}

export const fetchRequests = async () => {
    return await axios.get('/api/request');
}

export const updateStatus = async () => {
    return await axios.patch('/api/request/status');
}