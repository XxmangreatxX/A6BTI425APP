import { getToken } from './authenticate';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  const response = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}

export const getFavourites = async () => {
  return fetchWithAuth(`/favourites`);
};

export const addToFavourites = async (id) => {
  return fetchWithAuth(`/favourites/${id}`, { method: 'PUT' });
};

export const removeFromFavourites = async (id) => {
  return fetchWithAuth(`/favourites/${id}`, { method: 'DELETE' });
};

export const getHistory = async () => {
  return fetchWithAuth(`/history`);
};

export const addToHistory = async (id) => {
  return fetchWithAuth(`/history/${id}`, { method: 'PUT' });
};

export const removeFromHistory = async (id) => {
  return fetchWithAuth(`/history/${id}`, { method: 'DELETE' });
};
