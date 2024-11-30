import axios from 'axios';
import { User } from 'dhinta-turborepo/packages/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchUserData = async ({ id }: {id: string}) => { 
  try {
    const token = localStorage.getItem('idToken');
    const response = await axios.get(`${API_BASE_URL}/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchAllUserData = async () => { 
  try {
    const token = localStorage.getItem('idToken');
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};

export const createUserData = async ({id, name, address}: User) => { 
  try {
    const token = localStorage.getItem('idToken');
    const response = await axios.post(
      `${API_BASE_URL}/user`, 
      {
        id: id,
        name: name,
        address: address,
        // Add more body parameters as needed
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add more headers as needed
        }
      }
    );
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};


export const updateUserData = async ({id, name, address}: User) => { 
  try {
    const token = localStorage.getItem('idToken');
    const response = await axios.patch(
      `${API_BASE_URL}/user/${id}`, 
      {
        name: name,
        address: address,
        // Add more body parameters as needed
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add more headers as needed
        }
      }
    );
    return response.data;
  } catch (error: any) {
    return error.message;
  }
};