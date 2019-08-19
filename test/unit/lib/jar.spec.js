const { empty } = require('../../../lib/jar');
const { jar: urlJar } = require('../../../lib/utils/urls');

jest.mock('../../../lib/utils/request', () => ({
  post: jest.fn(),
}));
const { post: requestPost } = require('../../../lib/utils/request');

describe('Jar', () => {
  describe('Should call to request with de some url', () => {
    it('When call empty', () => {
      const url = `${urlJar}/empty`;

      empty();

      expect(requestPost).toBeCalled();
      expect(requestPost).toBeCalledWith(url);
    });
  });
});
