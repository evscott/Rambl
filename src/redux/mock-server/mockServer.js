import FetchMock from 'fetch-mock';
import { mockUser } from './mockUser';
import { mockTrips } from './mockTrips';
import { mockTrans } from './mockTrans';
import { mockAccoms } from './mockAccoms';
import { mockPlans } from './mockPlans';

export function mock() {
  mockUser();
  mockTrips();
  mockTrans();
  mockAccoms();
  mockPlans();
}

export function unMock() {
  FetchMock.restore();
}
