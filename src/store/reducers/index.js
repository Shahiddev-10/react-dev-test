import { CURRENT_PAGE, GET_CONTACTS, GET_MORE_CONTACTS, INCREASE_CURRENT_PAGE } from "../constants";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      }

    case GET_MORE_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      }

    case CURRENT_PAGE:
      return {
        ...state,
        page: action.payload,
      }

    case INCREASE_CURRENT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      }

    default: return state;
  }
}

export default reducer;