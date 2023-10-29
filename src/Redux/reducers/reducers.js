import { SET_FOLLOWING_USERS, SET_USERS_DATA, USER_INFO } from "../actionsTypes";


const initialState = {
  userInfo: null,
  usersData: [],
  followingUsers: [],
};

 const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case USER_INFO:
      return{
        ...state,
        userInfo : action.payload
      }

    case SET_USERS_DATA:
      return{
        ...state,
        usersData : action.payload
    }

    case SET_FOLLOWING_USERS:
      return{
        ...state,
        followingUsers : action.payload
      }
    
    default:
      return state;
  }
};
export default reducer