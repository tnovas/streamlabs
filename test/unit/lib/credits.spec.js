const { roll } = require('../../../lib/credits');
const { credits: urlCredits } = require('../../../lib/utils/urls');

jest.mock('../../../lib/utils/request', () => ({
  post: jest.fn(),
}));
const { post: requestPost } = require('../../../lib/utils/request');

describe('Credits', () => {
  describe('Should call to request with de some url', () => {
    it('When call roll', () => {
      const url = `${urlCredits}/roll`;

      roll();

      expect(requestPost).toBeCalled();
      expect(requestPost).toBeCalledWith(url);
    });
  });
});
