const API_BASE_URL = 'https://smart-crop-advisory-system-backend.onrender.com/api';

console.log('API Base URL:', API_BASE_URL);

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  role: 'farmer' | 'buyer' | 'admin';
  isVerified: boolean;
  profile?: {
    avatar?: string;
    bio?: string;
    farmSize?: number;
    crops?: string[];
    experience?: number;
  };
  location?: {
    type: string;
    coordinates: [number, number];
    address: string;
    state: string;
    district: string;
    pincode: string;
  };
  preferences?: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    units: 'metric' | 'imperial';
  };
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  language: string;
}

export interface Crop {
  id: string;
  name: string;
  quantity: number;
  price: number;
  location: string;
  harvestDate: string;
  photos: string[];
  farmerId: string;
  farmerName: string;
  createdAt: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  cropId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Authentication endpoints
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    return this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData: SignupData): Promise<{ user: User; token: string }> {
    return this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile(token: string): Promise<User> {
    return this.request<User>('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Crop marketplace endpoints - FIXED to handle response wrapper
  async getCrops(): Promise<Crop[]> {
    const response = await this.request<{ success: boolean; count: number; data: Crop[] }>('/crops');
    return response.data;
  }

  async getCrop(id: string): Promise<Crop> {
    const response = await this.request<{ success: boolean; data: Crop }>(`/crops/${id}`);
    return response.data;
  }

  async createCrop(cropData: Omit<Crop, 'id' | 'farmerId' | 'farmerName' | 'createdAt'>, token: string): Promise<Crop> {
    const response = await this.request<{ success: boolean; data: Crop }>('/crops', {
      method: 'POST',
      body: JSON.stringify(cropData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  // Order endpoints - FIXED to handle response wrapper
  async getOrders(token: string): Promise<Order[]> {
    const response = await this.request<{ success: boolean; count: number; data: Order[] }>('/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>, token: string): Promise<Order> {
    const response = await this.request<{ success: boolean; data: Order }>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async updateOrderStatus(orderId: string, status: Order['status'], token: string): Promise<Order> {
    const response = await this.request<{ success: boolean; data: Order }>(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
