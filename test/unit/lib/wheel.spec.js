const { spin } = require('../../../lib/wheel');
const { wheel: urlWheel } = require('../../../lib/utils/urls');

jest.mock('../../../lib/utils/request', () => ({
  post: jest.fn(),
}));
const { post: requestPost } = require('../../../lib/utils/request');

describe('Wheel', () => {
  describe('Should call to request with de some url', () => {
    it('When call spin', () => {
      const url = `${urlWheel}/spin`;

      spin();

      expect(requestPost).toBeCalled();
      expect(requestPost).toBeCalledWith(url);
    });
  });
});
