import { APIRequestContext } from '@playwright/test';

export class UsersApi {
  constructor(private request: APIRequestContext) {}

  async create(data: { nombre: string; email: string; rol?: string; estado?: string }) {
    const res = await this.request.post('/api/users', { data });
    return res.json();
  }

  async getAll(params?: { search?: string; role?: string; status?: string; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.role) searchParams.set('role', params.role);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    const res = await this.request.get(`/api/users?${searchParams}`);
    return res.json();
  }

  async getById(id: string) {
    const res = await this.request.get(`/api/users/${id}`);
    return res.json();
  }

  async update(id: string, data: Record<string, unknown>) {
    const res = await this.request.put(`/api/users/${id}`, { data });
    return res.json();
  }

  async delete(id: string) {
    const res = await this.request.delete(`/api/users/${id}`);
    return res.json();
  }
}
