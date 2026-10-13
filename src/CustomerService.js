

import axios from 'axios';

const API_URL = "http://localhost:5555/api/v1";

export const insertCustomer = (customer) =>
    axios.post(`${API_URL}/CreateCust`, customer);

export const getCustomers = () =>
    axios.get(`${API_URL}/getAllCustomers`);

export const deleteConstumerById =(id)=> axios.delete(`${API_URL}/delete/${id}`);

export const updateCustomer = async (id, customer) => {
    const payload = { ...customer, cid: id };
    const endpoints = [
        `${API_URL}/update/${id}`,
        `${API_URL}/UpdateCust/${id}`,
        `${API_URL}/updateCustomer/${id}`
    ];

    let lastError;

    for (const endpoint of endpoints) {
        try {
            return await axios.put(endpoint, payload);
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError;
};