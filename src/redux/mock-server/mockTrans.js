import FetchMock from 'fetch-mock';
import { hostUrl } from '../../shared/Config';

export function mockTrans() {
  FetchMock.mock(hostUrl + '/tran/get', 200, {
    success: true,
    message: 'Get all transportation successful!',
    result: [
      {
        e_id: 7,
        trip_id: 1,
        cost: 17.5,
        begin_time: '2019-04-11T15:32:32.000Z',
        end_time: '2019-04-15T15:32:34.000Z',
        loc: 'Moncton',
        loc_end: 'Rennes',
        dscript: 'Flight to Rennes',
        completed: 0,
        priority: '0',
        method: 'plane'
      },
      {
        e_id: 8,
        trip_id: 1,
        cost: 20.5,
        begin_time: '2019-05-11T15:32:32.000Z',
        end_time: '2019-05-16T17:35:34.000Z',
        loc: 'Rennes',
        loc_end: 'Moncton',
        dscript: 'Flight to Moncton',
        completed: 0,
        priority: '0',
        method: 'plane'
      },
      {
        e_id: 9,
        trip_id: 2,
        cost: 1777.5,
        begin_time: '2019-01-01T10:32:32.000Z',
        end_time: '2019-01-01T15:32:34.000Z',
        loc: 'Baconland',
        loc_end: 'Rennes',
        dscript: 'Flight to Rennes',
        completed: 0,
        priority: '0',
        method: 'plane'
      },
      {
        e_id: 10,
        trip_id: 3,
        cost: 0.5,
        begin_time: '2020-01-01T10:32:32.000Z',
        end_time: '2021-01-01T15:32:34.000Z',
        loc: 'China',
        loc_end: 'Mount Allison University',
        dscript: 'Drive over the sea',
        completed: 0,
        priority: '0',
        method: 'plane'
      }
    ]
  });
}
