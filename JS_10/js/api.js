// js/api.js

const API_URL = 'https://randomuser.me/api/';

const fetchUsers = async (page = 1, results = 30, seed = 'friendsapp') => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&results=${results}&seed=${seed}&inc=name,dob,location,email,phone,picture,registered,login`);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
};

export { fetchUsers };
