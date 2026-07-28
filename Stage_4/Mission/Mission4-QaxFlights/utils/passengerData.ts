import { faker } from '@faker-js/faker';

export class PassengerData {
    static getPassenger() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            docType: 'CC',
            docNumber: faker.string.numeric(10),
            birthDate: '1995-05-15',
            nationality: 'Colombiana'
        };
    }
}