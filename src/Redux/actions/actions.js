import {  SET_FOLLOWING_USERS, SET_USERS_DATA, USER_INFO } from "../actionsTypes";


  const setUserInfo = (payload) =>{
    return {
      type : USER_INFO,
      payload
    }
  }

  const setUsersData = (payload) =>{
    return {
      type : SET_USERS_DATA,
      payload
    }
  }

  const setFollowingUsers = (payload) =>{
    return {
      type : SET_FOLLOWING_USERS,
      payload
    }
  }
  
  export { setUserInfo, setUsersData, setFollowingUsers};