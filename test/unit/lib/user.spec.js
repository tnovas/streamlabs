const user = require('../../../lib/user');
const { user: url } = require('../../../lib/utils/urls');

jest.mock('../../../lib/utils/request', () => ({
  get: jest.fn(),
}));
const { get: requestGet } = require('../../../lib/utils/request');

describe('User', () => {
  describe('Should call to request with de some url', () => {
    it('When call user', () => {
      user();

      expect(requestGet).toBeCalled();
      expect(requestGet).toBeCalledWith(url);
    });
  });
});
