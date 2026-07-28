import { APIRequestContext } from '@playwright/test';

export class ProductsApi {
  constructor(private request: APIRequestContext) {}

  async create(data: { nombre: string; categoria: string; precio?: number; stock?: number }) {
    const res = await this.request.post('/api/products', { data });
    return res.json();
  }

  async getAll(params?: { search?: string; category?: string; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    const res = await this.request.get(`/api/products?${searchParams}`);
    return res.json();
  }

  async getById(id: string) {
    const res = await this.request.get(`/api/products/${id}`);
    return res.json();
  }

  async update(id: string, data: Record<string, unknown>) {
    const res = await this.request.put(`/api/products/${id}`, { data });
    return res.json();
  }

  async delete(id: string) {
    const res = await this.request.delete(`/api/products/${id}`);
    return res.json();
  }
}
