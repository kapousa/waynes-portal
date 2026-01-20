// Strapi API Configuration
export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

// API Token for Strapi requests (for production, move to secure environment variables)
const STRAPI_API_TOKEN = '3709ec419c6291f3928fba5b64e87c1b09569d3fa187d0b757d476b489f966877f96e361c63287abfa08080ec25bf2be22f9e364b6b15c448281152bc1b3dbe9c9c00497404f139cca6e6c7fec91698377de4dcb5bc4ed7c8d9c0d985e7c8d083d0359ed6eba25067a18d38c882c340e74e569f7da67f1acb473df6d4b029fd3';

interface LoginCredentials {
  identifier: string;
  password: string;
}

interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface Category {
  id: number;
  attributes: {
    name: string;
    nameAr?: string;
    description: string;
    descriptionAr?: string;
    icon: string;
    slug: string;
    documentsCount?: number;
  };
}

interface Document {
  id: number;
  attributes: {
    title: string;
    titleAr?: string;
    description: string;
    descriptionAr?: string;
    tags: string[];
    file: {
      data: {
        attributes: {
          url: string;
          name: string;
          size: number;
        };
      };
    };
    category: {
      data: Category;
    };
    createdAt: string;
    updatedAt: string;
  };
}

// Get auth token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('waynes_token');
};

// Set auth token
export const setToken = (token: string): void => {
  localStorage.setItem('waynes_token', token);
};

// Remove auth token
export const removeToken = (): void => {
  localStorage.removeItem('waynes_token');
  localStorage.removeItem('waynes_user');
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('waynes_user');
  return user ? JSON.parse(user) : null;
};

// Set current user
export const setCurrentUser = (user: AuthResponse['user']): void => {
  localStorage.setItem('waynes_user', JSON.stringify(user));
};

// API request helper
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  locale?: string
): Promise<T> => {
  const url = new URL(`${STRAPI_URL}/api${endpoint}`);
  
  if (locale) {
    url.searchParams.set('locale', locale);
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.error?.message || error.message || 'Request failed');
  }

  return response.json();
};

// Auth endpoints
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiRequest<AuthResponse>('/auth/local', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  setToken(response.jwt);
  setCurrentUser(response.user);
  
  return response;
};

export const logout = (): void => {
  removeToken();
};

// Categories endpoints
export const getCategories = async (locale: string = 'en'): Promise<{ data: Category[] }> => {
  return apiRequest<{ data: Category[] }>('/categories?populate=*', {}, locale);
};

// Documents endpoints
export const getDocuments = async (
  locale: string = 'en',
  categorySlug?: string
): Promise<{ data: Document[] }> => {
  let endpoint = '/documents?populate=*';
  if (categorySlug) {
    endpoint += `&filters[category][slug][$eq]=${categorySlug}`;
  }
  return apiRequest<{ data: Document[] }>(endpoint, {}, locale);
};

export const searchDocuments = async (
  query: string,
  locale: string = 'en'
): Promise<{ data: Document[] }> => {
  const endpoint = `/documents?populate=*&filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}`;
  return apiRequest<{ data: Document[] }>(endpoint, {}, locale);
};

export const getDocument = async (
  id: number,
  locale: string = 'en'
): Promise<{ data: Document }> => {
  return apiRequest<{ data: Document }>(`/documents/${id}?populate=*`, {}, locale);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export type { Category, Document, AuthResponse };
