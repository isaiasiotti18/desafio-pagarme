/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

/* eslint-disable no-undef */

import request from 'supertest';
import app from '../../../../../app';
import CreateCustomerDto from '../dtos/create-customer.dto';

describe('Create Customer Controller', () => {
  it('should be able to create a new customer and return statusCode 200', async () => {
    const customer: CreateCustomerDto = {
      email: 'teste@email.com',
      cpf: '51555677002',
      name: 'Teste Service',
      password: 'Teste@2022',
    };

    const response = await request(app)
      .post('/api/v1/customers/create-customer')
      .send(customer);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create an existing customer and return statusCode 400', async () => {
    await request(app).post('/api/v1/customers/create-customer').send({
      email: 'teste@pagarme.com',
      cpf: '51555677002',
      name: 'Teste Controller',
      password: 'Teste@pagarme',
    });

    const response = await request(app)
      .post('/api/v1/customers/create-customer')
      .send({
        email: 'teste@pagarme.com',
        cpf: '51555677002',
        name: 'Teste Controller',
        password: 'Teste@pagarme',
      });

    expect(response.status).toBe(400);
  });
});
