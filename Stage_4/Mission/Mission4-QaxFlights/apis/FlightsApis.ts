import { APIRequestContext} from '@playwright/test';

export class FlightsApi{

    constructor(private request: APIRequestContext) {}

    async getAll(){
        const res = await this.request.get('/api/flights');

        return {
            res,
            body: await res.json()
        };
    }

    async search(params?: {origin?: string; destination?: string;date?: string;}) {

        const searchParams = new URLSearchParams();
        if (params?.origin) searchParams.set('origin', params.origin);
        if (params?.destination) searchParams.set('destination', params.destination);
        if (params?.date) searchParams.set('date', params.date);

        const response = await this.request.get(`/api/flights/search?${searchParams.toString()}`);
        return {
            response,
            body: await response.json()
        };
    }

    async getById(id: string){
        const response = await this.request.get(`/api/flights/${id}`);
        return {
            response,
            body: await response.json()
        };
    }

    async updateOccupiedSeats(id: string, occupiedSeats: string[]){
        const response = await this.request.put(`/api/flights/${id}`, {
            data: {
                occupiedSeats
            }
        });
        return {
            response,
            body: await response.json()
        };
    }

}