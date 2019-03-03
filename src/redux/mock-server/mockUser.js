import FetchMock from 'fetch-mock';
import { hostUrl } from '../../shared/Config';

export function mockUser() {
  FetchMock.mock(hostUrl + '/login', 200, {
    success: true,
    message: 'Authentication successful!',
    token: 'faketoken'
  });

  FetchMock.mock(hostUrl + '/user/getinfo', 200, {
    success: true,
    message: 'Get user info successful!',
    result: [
      {
        user_id: 2,
        email: 'graeme@gmail.com',
        password: 'password',
        date_created: null,
        f_name: 'undefined',
        l_name: 'undefined'
      }
    ]
  });
}
