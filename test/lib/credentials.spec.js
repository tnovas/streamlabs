const { get, set, setSocketToken } = require('../../lib/credentials');

const initCredentials = {
  accessToken: 'Uxfsg6kaeese60F477ekgfJsb77xJG6lKut7fgEO',
  refreshToken: 'o678fl8jjFUk1z3PczBsxQg8buLzqQztsd0FZHXZ',
  expiresIn: 3600,
  socketToken: 'eyJ0eXAiOiJK',
};

describe('Credentials', () => {
  beforeEach(() => {
    set(initCredentials);
  });

  it('Should get credentials', () => {
    const credentials = get();
    expect(credentials).toBe(initCredentials);
  });

  it('Should set credentials', () => {
    const newCredentials = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    set(newCredentials);

    const credentials = get();

    expect(credentials).toBe(newCredentials);
  });

  it('Should set only socket token', () => {
    const socketToken = 'socketToken';
    const modifyCredentials = {
      ...initCredentials,
    };
    modifyCredentials.socketToken = socketToken;

    setSocketToken(socketToken);

    const credentials = get();

    expect(credentials).toEqual(modifyCredentials);
  });
});
