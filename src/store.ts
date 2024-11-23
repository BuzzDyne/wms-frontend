import { createStore } from "redux";

interface Action {
  type: string;
  [key: string]: any;
}

const initialState = {
  sidebarShow: true,
};

const changeState = (state = initialState, action: Action) => {
  const { type, ...rest } = action;
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
