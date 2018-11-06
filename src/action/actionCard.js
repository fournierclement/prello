// Modules
import uuidv4 from "uuidv4";


// default state
export const initCard = {
  id : 0 , //TODO check
  name: 'My card',
  dueDate : '01/10/2018',
  pos : null,
  closed: false,
  idList : null
  }
  
  // Action type constants
 // export const SET_CARD_ID = "@@card/SET_CARD_ID";
  export const SET_CARD_NAME = "@@card/SET_CARD_NAME";
  export const SET_CARD_DUE_DATE = "@@card/SET_CARD_DUE_DATE"
  export const SET_CARD_POSITION = "@@card/SET_CARD_POSITION"
  export const SET_CARD_CLOSED = "@@card/SET_CARD_CLOSED"
  export const SET_CARD_LIST = "@@card/SET_CARD_LIST"


  export const SET_NEW_CARD= "@@card/SET_NEW_CARD"

  export const setCardName= (id, newName) => ({
    type: SET_CARD_NAME,
    payload:  {
      id : id,
      name : newName
    }
  })

  export const setCardDueDate= (id, newDueDate) => ({
    type: SET_CARD_DUE_DATE,
    payload:  {
      id: id,
      dueDate : newDueDate
    }
  })

  export const setCardPosition = (id, newPos) => ({
    type: SET_CARD_POSITION,
    payload:  {
      id : id,
      pos : newPos
    }
  })

  export const setCardClosed = (id, newClosed) => ({
    type: SET_CARD_CLOSED,
    payload:  {
      id: id,
      closed : newClosed
    }
  })

  export const setCardList = (id, newIdList) => ({
    type: SET_CARD_LIST,
    payload:  {
      id : id,
      idList : newIdList
    }
  })


  

