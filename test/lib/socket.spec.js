const get = require('../../lib/socket');
const { socketToken: url } = require('../../lib/utils/urls');

jest.mock('../../lib/credentials', () => ({
  setSocketToken: jest.fn(),
}));

const resultMock = {
  data: {
    socket_token: 'socket_token',
  },
};

jest.mock('../../lib/request', () => ({
  get: jest.fn().mockResolvedValue({
    data: {
      socket_token: 'socket_token',
    },
  }),
}));

const { setSocketToken } = require('../../lib/credentials');
const { get: requestGet } = require('../../lib/request');

describe('Socket', () => {
  it('Should get socket token and save it', (done) => {
    get().then((result) => {
      expect(result).toEqual(resultMock);
      expect(setSocketToken).toBeCalled();
      expect(setSocketToken).toBeCalledWith(resultMock.data.socket_token);
      expect(requestGet).toBeCalled();
      expect(requestGet).toBeCalledWith(url, {});
      done();
    });
  });
});
