/* eslint-disable no-undef */

import request from 'supertest';
import app from '../../../../../app';

describe('Transaction Processing Controller', () => {
  it('should be able to create a new transaction processing and return status code 200', async () => {
    const payable = {
      customerId: '12ba0be8-4729-429f-aee4-9116ad5ed4dd',
      value: 456,
      description: 'Monitor Gamer',
      cardNumber: '7062821015639587',
      cardHolderName: 'ISAIAS SANTOS',
      validThru: '05/2024',
      cardVerificationValue: 887,
      cardType: 'credit_card',
    };

    const response = await request(app)
      .post('/api/v1/transactions/transaction-processing')
      .send(payable);

    console.log(response.body);

    expect(response.status).toBe(200);
  });
});
