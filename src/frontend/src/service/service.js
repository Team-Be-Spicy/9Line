import axios from "axios";

export const submitForm = async (formData) => {
    return axios.post('/api/request', formData);
}

export const fetchCompleted = async (token) => {
    return await axios.get('/api/request/complete', {headers: {Authorization: `Bearer ${token}`}});
}

export const fetchAll = async (token) => {
    return await axios.get('/api/request/all', {headers: {Authorization: `Bearer ${token}`}});
}

export const fetchRequests = async (token, responderName) => {
    return await axios.get(`/api/request/responder/${responderName}`, {headers: {Authorization: `Bearer ${token}`}});
};

export const updateStatus = async (token, requestId, status) => {
    return await axios.patch('/api/request/status/' + requestId, {status: status}, {headers: {Authorization: `Bearer ${token}`}});
}

export const updateResponder = async (token, id, respName) => {
    return await axios.patch('/api/request/responder/update/' + id, {responder: respName}, {headers: {Authorization: `Bearer ${token}`}});
}

