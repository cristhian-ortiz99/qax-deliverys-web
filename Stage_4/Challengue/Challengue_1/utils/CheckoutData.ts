import { faker } from '@faker-js/faker';

export class CheckoutData {

    static getBuyer() {
        return {
            nombre: faker.person.fullName(),
            direccion: faker.location.streetAddress(),
            telefono: `9${faker.string.numeric(8)}`,
            ciudad: 'Cali'
        };
    }

    static getPayment() {
        return {
            numeroTarjeta: '4111111111111111',
            vencimiento: '0528',
            cvv: '123'
        };
    }

}