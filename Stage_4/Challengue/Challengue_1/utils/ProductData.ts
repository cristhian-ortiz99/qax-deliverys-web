import { faker } from '@faker-js/faker';

export class ProductData {
    static getProduct() {
        return {
            nombre: faker.commerce.productName(),
            descripcion: faker.commerce.productDescription(),
            categoria: 'Celulares y Telefonía',
            precio: faker.number.int({
                min: 500,
                max: 30000
            }).toString(),
            stock: faker.number.int({
                min: 1,
                max: 20
            }).toString()
        };
    }

}