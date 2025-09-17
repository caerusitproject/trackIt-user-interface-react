import axios from 'axios';
import {domainurl} from "./domain.js"

// Create an Axios instance
const api = axios.create({
  baseURL: domainurl, 
  timeout: 3000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',

    // 'Authorization': 'Bearer dummy-token' // Example header
  }
});

export default api;