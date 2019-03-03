import configureStore from '../store/configureStore';
import { login } from '../actions/authActions';
import { getTripsFromDb } from '../actions/tripActions';
import { mock, unMock } from '../mock-server/mockServer';
import { getAccomsFromDb } from '../actions/accomActions';
import { getPlansFromDb } from '../actions/planActions';
import { getTransFromDb } from '../actions/tranActions';

let setupStore = async (store) => {
  return store.dispatch(login({}))
    .then(() => store.dispatch(getTripsFromDb()))
    .then(() => store.dispatch(getAccomsFromDb()))
    .then(() => store.dispatch(getPlansFromDb()))
    .then(() => store.dispatch(getTransFromDb()));
};

mock();
let store = configureStore();
setupStore(store)
  .then(() => {
    console.log(store.getState());
  });
unMock();
