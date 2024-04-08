import * as actionType from "./action";

const initialState = {
  roles: [],
  selectedRole: null,
};

export default function ReducerRole(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_ROLES:
      return { ...state, roles: action.payload };
    case actionType.DELETE_ROLE:
      return { ...state, roles: action.payload };
    case actionType.ADD_ROLE: {
      const roles = [...state.roles];
      roles.push(action.payload);
      return { ...state, roles };
    }

    default: {
      return { ...state };
    }
  }
}
