import { APIRequestContext} from '@playwright/test';

export class BookingsApi{

    constructor(private request: APIRequestContext) {}

    async create(data: Record<string, unknown>){
        const response = await this.request.post('/api/bookings', {
            data
        });
        return {
            response,
            body: await response.json()
        };
    }

    async getAll(){
        const response = await this.request.get('/api/bookings');
        return {
            response,
            body: await response.json()
        };
    }

    async getById(id: string){
        const response = await this.request.get(`/api/bookings/${id}`);
        return {
            response,
            body: await response.json()
        };
    }

    async update(id: string, data: Record<string, unknown>){
        const response = await this.request.put(`/api/bookings/${id}`, {
            data
        });
        return {
            response,
            body: await response.json()
        };
    }
}