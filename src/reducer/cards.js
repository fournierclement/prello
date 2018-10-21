// Action types
import { MOVE_CARD_IN_LIST, ADD_CARD_IN_LIST } from '../action/actionList';


export default ( state = [], action) => {
  switch(action.type) {
    case ADD_CARD_IN_LIST:
      return [...state, action.payload]
    case MOVE_CARD_IN_LIST:
      let cardToMove = state[action.payload.listToMovePos];
      let cards = state.filter((card, index) => index !== action.payload.cardToMovePos);
      return [
        ...cards.slice(0, action.payload.newCardPos),
        cardToMove,
        ...cards.slice(action.payload.newCardPos)
      ];
    default:
      return state;
  }
}