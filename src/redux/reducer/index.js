import { type } from '../action'

const initialState = {
  menuName: '首页'
}

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        ...state,
        menuName: action.payload
      }
    default:
      return state;
  }
}