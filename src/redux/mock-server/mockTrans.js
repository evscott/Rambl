import { convertDate } from '../getters/convertDate';

export function mockTrans() {
  return {
    trans: [
      {
        e_id: 7,
        trip_id: 1,
        cost: 17.5,
        begin_time: convertDate('2019-04-11T15:32:32.000Z'),
        end_time: convertDate('2019-04-15T15:32:34.000Z'),
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
        begin_time: convertDate('2019-05-11T15:32:32.000Z'),
        end_time: convertDate('2019-05-16T17:35:34.000Z'),
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
        begin_time: convertDate('2019-01-01T10:32:32.000Z'),
        end_time: convertDate('2019-01-01T15:32:34.000Z'),
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
        begin_time: convertDate('2020-01-01T10:32:32.000Z'),
        end_time: convertDate('2021-01-01T15:32:34.000Z'),
        loc: 'China',
        loc_end: 'Mount Allison University',
        dscript: 'Drive over the sea',
        completed: 0,
        priority: '0',
        method: 'plane'
      },
      {
        e_id: 11,
        trip_id: 6,
        cost: 0.5,
        begin_time: convertDate('2000-01-01T10:32:32.000Z'),
        end_time: convertDate('2001-01-01T15:32:34.000Z'),
        loc: 'Nowhere',
        loc_end: 'Somewhere',
        dscript: 'Fake transportation record',
        completed: 0,
        priority: '0',
        method: 'plane'
      }
    ]
  };
}
