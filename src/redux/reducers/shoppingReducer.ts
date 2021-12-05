import { FoodAvailability, ShoppingState } from '../models';
import { ShoppingAction } from '../actions';

const initialState = {
  availability: {} as FoodAvailability,
};

const ShoppingReducer = (
  state: ShoppingState = initialState,
  action: ShoppingAction
) => {
  switch (action.type) {
    case 'ON_AVAILABILITY':
      return {
        ...state,
        availability: action.payload,
      };

    default:
      return state;
  }
};

export { ShoppingReducer };
