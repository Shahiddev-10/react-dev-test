import { createStore } from 'redux'
import reducer from './reducers';

const initialState = {
  contacts: {},
  page: 1
};

const store = createStore(reducer, initialState);

export default store;