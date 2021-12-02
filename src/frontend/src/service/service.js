import axios from "axios";

export const testBackend = async () => {
    return await axios.get('/api/test');
}

export const submitForm = async (formData) => {
    return axios.post('/api/request', formData);
}

export const fetchRequests = async (token, responderName) => {
    return await axios.get(`/api/request/responder/${responderName}`, {headers: {Authorization: `Bearer ${token}`}});
};

export const updateStatus = async (requestId) => {
    return await axios.patch('/api/request/status/' + requestId);
}

export const updateResponder = async (id,respName) => {
    return await axios.patch('/api/request/responder/' + id, {responder: respName});
}

