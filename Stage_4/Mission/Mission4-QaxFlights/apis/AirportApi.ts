import { APIRequestContext} from '@playwright/test';

export class AirportApi{

    constructor(private request: APIRequestContext) {}

    async getAll(){
        const res = await this.request.get('/api/airports');
        return{
            res,
            body: await res.json()
        };
    }

}