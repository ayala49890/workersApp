import * as actionType from "./action";

const initialState = {
  workers: [],
  selectedWorker: null,
};

export default function ReducerWorker(state = initialState, action) {
  switch (action.type) {
    case actionType.SET_WORKERS:
      return { ...state, workers: action.payload };
    case actionType.DELETE_WORKER:
      return { ...state, workers: action.payload };
    case actionType.ADD_WORKER: {
      const workers = [...state.workers];
      workers.push(action.payload);
      return { ...state, workers };
    }
    case actionType.SET_SELECTED_WORKER: {
      return { ...state, selectedWorker: action.payload };
    }

    default: {
      return { ...state };
    }
  }
}
