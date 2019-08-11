// const mockAxios = require('jest-mock-axios');
const { get, post } = require('../../lib/request');

jest.mock('../../lib/credentials', () => ({
  get: jest.fn().mockImplementation(() => ({
    accessToken: 'token',
  })),
}));
const { get: getCredentials } = require('../../lib/credentials');

describe('Request', () => {
  it('Should call post axios with params, access token and url', () => {
    const url = 'donations';
    const data = {
      name: 'Fishstickslol',
      message: 'I love Fishsticks!',
      identifier: 'fishingthesticks@gmail.com',
      amount: 10,
      currency: 'USD',
      access_token: 'token',
    };

    post(url, data);

    expect(getCredentials).toBeCalled();
    // expect(mockAxios.post).toHaveBeenCalledWith(url, { data });
  });

  it('Should call get axios with params, access token and url', () => {
    const url = 'donations';
    const params = {
      limit: 10,
    };

    get(url, params);

    expect(getCredentials).toBeCalled();
    // expect(mockAxios.post).toHaveBeenCalledWith(url, { data });
  });
});
