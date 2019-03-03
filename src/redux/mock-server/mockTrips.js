import FetchMock from 'fetch-mock';
import { hostUrl } from '../../shared/Config';

export function mockTrips() {
  FetchMock.mock(hostUrl + '/trip/get', 200, {
    success: true,
    message: 'Get trips successful!',
    result: [
      {
        user_id: 2,
        trip_id: 1,
        name: 'Sackville',
        dscript: 'Test trip'
      },
      {
        user_id: 2,
        trip_id: 2,
        name: 'Bacon Adventure',
        dscript: 'Gr8 Times!'
      },
      {
        user_id: 2,
        trip_id: 3,
        name: 'test trip4',
        dscript: 'description...'
      },
      {
        user_id: 2,
        trip_id: 4,
        name: 'updated',
        dscript: 'blah'
      },
      {
        user_id: 2,
        trip_id: 5,
        name: 'redux trip blah blah',
        dscript: ''
      }
    ]
  });
}
