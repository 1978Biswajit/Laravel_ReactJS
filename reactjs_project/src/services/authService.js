import axios from 'axios';

// Define the base URL for API calls
const API_URL = process.env.REACT_APP_API_URL;

// Function to login and store authentication details
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    // Store authentication token
    localStorage.setItem('authToken', response.data.token);

    // Fetch and store user details
    await fetchUserDetails();

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Rethrow for error handling in the UI
  }
};

// Function to fetch user details and store the role
export const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.setItem('userRole', response.data.role); // Store role
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

// Function to logout
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  window.location.href = "/login"; // Redirect to login page
};
