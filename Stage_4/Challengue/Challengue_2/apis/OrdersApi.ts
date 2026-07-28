import { APIRequestContext } from '@playwright/test';

export class OrdersApi {
  constructor(private request: APIRequestContext) {}

  async create(data: { cliente: string; producto: string; total?: number }) {
    const res = await this.request.post('/api/orders', { data });
    return res.json();
  }

  async getAll(params?: { search?: string; status?: string; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    const res = await this.request.get(`/api/orders?${searchParams}`);
    return res.json();
  }

  async getById(id: string) {
    const res = await this.request.get(`/api/orders/${id}`);
    return res.json();
  }

  async getStats() {
    const res = await this.request.get('/api/orders/stats');
    return res.json();
  }

  async update(id: string, data: Record<string, unknown>) {
    const res = await this.request.put(`/api/orders/${id}`, { data });
    return res.json();
  }

  async delete(id: string) {
    const res = await this.request.delete(`/api/orders/${id}`);
    return res.json();
  }
}
