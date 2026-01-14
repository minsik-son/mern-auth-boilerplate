import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// Define the type of data to be passed.
export interface UserData {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  [key: string]: any;
}

// Define the type of data returned from the API.
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Create an Axios instance
const api: AxiosInstance = axios.create({
  baseURL: '/api/user', 
  headers: { 'Content-Type': 'application/json' }
});

// Function to send data to the server
export const postData = async (path: string, userData: UserData): Promise<UserData> => {
  try {
    const response: AxiosResponse<ApiResponse<UserData>> = await api.post(path, userData);
    console.log('postData here');
    return response.data.data; 
  } catch (error) {
    console.error("Data sending err:", error);
    throw error;
  }
};

// Function to fetch data from the server
export const fetchData = async  <T = UserData> (path: string): Promise<UserData> => {
  try {
    const response: AxiosResponse<ApiResponse<UserData>> = await api.get(path);
    return response.data.data; 
  } catch (error) {
    console.error("Data fetching err:", error);
    throw error;
  }
};

// Function to update data on the server
export const updateData = async (path: string, userData: UserData): Promise<UserData> => {
  try {
    const response: AxiosResponse<ApiResponse<UserData>> = await api.patch(path, userData);
    return response.data.data; 
  } catch (error) {
    console.error("Data updating err:", error);
    throw error;
  }
};

export default api;