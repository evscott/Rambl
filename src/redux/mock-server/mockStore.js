import { mockUser } from './mockUser';
import { mockTrips } from './mockTrips';
import { mockTrans } from './mockTrans';
import { mockAccoms } from './mockAccoms';
import { mockPlans } from './mockPlans';

export function mockStore() {
  return {
    plans: mockPlans(),
    user: mockUser(),
    trans: mockTrans(),
    trips: mockTrips(),
    accoms: mockAccoms()
  };
}
