const { add, get } = require('../../lib/donations');
const { donations: url } = require('../../lib/utils/urls');

jest.mock('../../lib/utils/request', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));
const { get: requestGet, post: requestPost } = require('../../lib/request');

describe('Donations', () => {
  describe('Should call to request with de some object and url', () => {
    it('When add donation', () => {
      const donation = {
        name: 'Fishstickslol',
        message: 'I love Fishsticks!',
        identifier: 'fishingthesticks@gmail.com',
        amount: 10,
        currency: 'USD',
      };

      add(donation);

      expect(requestPost).toBeCalled();
      expect(requestPost).toBeCalledWith(url, donation);
    });

    it('When get donations', () => {
      const limit = 10;
      const params = {
        limit,
        currency: 'USD',
        verified: false,
      };

      get(limit);

      expect(requestGet).toBeCalled();
      expect(requestGet).toBeCalledWith(url, params);
    });
  });
});
