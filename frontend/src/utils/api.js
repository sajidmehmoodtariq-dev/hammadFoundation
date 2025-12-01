// API utility for making requests to the backend
const API_URL = 'https://hammad-foundation-beackend.vercel.app';

// Get auth token
export const getToken = () => localStorage.getItem('adminToken');

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// Admin API
export const adminAPI = {
  login: async (credentials) => {
    return apiRequest('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  verify: async () => {
    return apiRequest('/api/admin/verify');
  },
};

// Content API
export const contentAPI = {
  // Slider
  getSlides: async () => {
    return apiRequest('/api/content/slider');
  },
  
  createSlide: async (slideData) => {
    return apiRequest('/api/content/slider', {
      method: 'POST',
      body: JSON.stringify(slideData),
    });
  },
  
  updateSlide: async (id, slideData) => {
    return apiRequest(`/api/content/slider/${id}`, {
      method: 'PUT',
      body: JSON.stringify(slideData),
    });
  },
  
  deleteSlide: async (id) => {
    return apiRequest(`/api/content/slider/${id}`, {
      method: 'DELETE',
    });
  },

  // Director
  getDirector: async () => {
    return apiRequest('/api/content/director');
  },
  
  updateDirector: async (id, directorData) => {
    return apiRequest(`/api/content/director/${id}`, {
      method: 'PUT',
      body: JSON.stringify(directorData),
    });
  },

  // Stats
  getStats: async () => {
    return apiRequest('/api/content/stats');
  },
  
  updateStat: async (id, statData) => {
    return apiRequest(`/api/content/stats/${id}`, {
      method: 'PUT',
      body: JSON.stringify(statData),
    });
  },

  // Bank Details
  getBank: async () => {
    return apiRequest('/api/content/bank');
  },
  
  updateBank: async (id, bankData) => {
    return apiRequest(`/api/content/bank/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bankData),
    });
  },
};

// Donations API
export const donationsAPI = {
  getAll: async () => {
    return apiRequest('/api/donations');
  },
  
  getByTransactionId: async (transactionId) => {
    return apiRequest(`/api/donations/${transactionId}`);
  },
  
  create: async (donationData) => {
    return apiRequest('/api/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  },
  
  updateStatus: async (id, statusData) => {
    return apiRequest(`/api/donations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(statusData),
    });
  },
};

export default {
  adminAPI,
  contentAPI,
  donationsAPI,
};
