import { faker } from '@faker-js/faker';

export function generarUser() {
  return {
    email: faker.internet.email(),
    phone: `9${faker.string.numeric(8)}`,
    firstName: faker.person.firstName(),
    password: `Qa${faker.string.alphanumeric(6)}*`
  };
}