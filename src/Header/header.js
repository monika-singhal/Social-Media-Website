import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { AppLogo } from '../SvgIcons';
import { Button } from '@material-ui/core';
import FriendListModal from '../FriendListModal';


function Header({user, setOpenSignupModal ,setOpenLoginModal}) {
    
    const [addFriendsModal, setAddFriendModal] = useState(false);
    const handleSignup = (event)=>{

        setOpenSignupModal(true);
      }
      const handleLogin = (event)=>{
        setOpenLoginModal(true);
      }
      
  return (
    <>
       {addFriendsModal && <FriendListModal addFriendsModal= {addFriendsModal} setAddFriendModal = {setAddFriendModal} currentUser = {user} setOpenLoginModal= {setOpenLoginModal}/>}
       <div className= 'app-header'>
      <div className= 'app-header-logo'>
        <AppLogo />
       
      </div>
      <div className='header-buttons'>
      <Button
            variant="contained"
            color="primary"
            onClick={()=>{setAddFriendModal(true)}}
          >
            Add Friend
          </Button>
      { user ?
      <div className='auth-button'>
      <Button onClick={()=>auth.signOut()}>Logout</Button>
      </div>
      :
      <div className='auth-button'>
      <Button onClick={handleSignup}>SignUp</Button>
      <Button onClick={handleLogin}>SignIn</Button>
      </div>
      
      }
     </div>
     </div>
     </>
 
  )
}

export default Header


