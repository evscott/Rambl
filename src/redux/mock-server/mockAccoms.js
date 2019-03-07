import { convertDate } from '../getters/convertDate';

export function mockAccoms() {
  return {
    accoms: {
      1: {
        3: {
          e_id: 3,
          trip_id: 1,
          cost: 159.19,
          check_in: convertDate('2019-04-11T16:00:00.000Z'),
          begin_time: convertDate('2019-04-11T17:32:32.000Z'),
          end_time: convertDate('2019-04-18T05:32:32.000Z'),
          loc: 'Rennes',
          dscript: 'Hangin in Rennes',
          completed: 0,
          priority: '2'
        }
      },
      2: {
        4: {
          e_id: 4,
          trip_id: 2,
          cost: 159.19,
          check_in: convertDate('2019-01-01T18:32:32.000Z'),
          begin_time: convertDate('2019-01-01T18:32:32.000Z'),
          end_time: convertDate('2019-01-02T10:32:32.000Z'),
          loc: 'Rennes',
          dscript: 'Hangin at the Best Western',
          completed: 0,
          priority: '2'
        }
      },
      3: {
        5: {
          e_id: 5,
          trip_id: 3,
          cost: 15999.19,
          check_in: convertDate('2019-01-01T18:32:32.000Z'),
          begin_time: convertDate('2019-01-01T18:32:32.000Z'),
          end_time: convertDate('2019-01-02T10:32:32.000Z'),
          loc: 'On the plane',
          dscript: 'Plane sleep zone',
          completed: 0,
          priority: '1'
        },
        6: {
          e_id: 6,
          trip_id: 3,
          cost: 15999.19,
          check_in: convertDate('2024-01-01T18:32:32.000Z'),
          begin_time: convertDate('2024-02-01T18:32:32.000Z'),
          end_time: convertDate('2019-01-02T10:32:32.000Z'),
          loc: 'It a mystery',
          dscript: 'This is a rando accommodation',
          completed: 0,
          priority: '1'
        }
      }
    }
  };
}
