import * as auth from './auth.reducers';

export interface AuthState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};
