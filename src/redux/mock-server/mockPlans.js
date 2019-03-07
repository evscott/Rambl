import { convertDate } from '../getters/convertDate';

export function mockPlans() {
  return {
    plans: {
      1: {
        7: {
          e_id: 7,
          trip_id: 1,
          cost: 153.3,
          begin_time: convertDate('2019-04-11T17:32:32.000Z'),
          end_time: convertDate('2019-04-11T19:32:32.000Z'),
          loc: 'Inria Research Institute, Rennes',
          dscript: 'Eat cheese',
          completed: 0,
          priority: '1'
        },
        9: {
          e_id: 9,
          trip_id: 1,
          cost: 15.3,
          begin_time: null,
          end_time: null,
          loc: 'Moncton',
          dscript: 'Figure out how to teleport',
          completed: 0,
          priority: '3'
        }
      },
      2: {
        11: {
          e_id: 11,
          trip_id: 2,
          cost: 15.4,
          begin_time: convertDate('2019-01-01T18:32:32.000Z'),
          end_time: convertDate('2019-01-01T19:32:32.000Z'),
          loc: 'Best Western',
          dscript: 'Be bored',
          completed: 0,
          priority: '1'
        }
      },
      4: {
        12: {
          e_id: 12,
          trip_id: 4,
          cost: null,
          begin_time: null,
          end_time: null,
          loc: null,
          dscript: 'Unassigned loose plan',
          completed: 0,
          priority: '1'
        }
      }
    }
  };
}
