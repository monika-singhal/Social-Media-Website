
import './App.css';
import firebase from 'firebase/compat/app';
import Post from './Post/Post';
import React , { useEffect, useMemo, useState } from 'react';
import { db } from './firebase';
import SignupModal from './AuthModal/SignupModal';

import LoginModal from './AuthModal/LoginModal';
import {  useDispatch, useSelector } from 'react-redux';

import MessagePost from './MessagePost';
import Header from './Header/header';
import { setFollowingUsers, setUsersData } from './Redux/actions/actions';


function App() {

  const [posts , setPosts] = useState([])
  const [openSignupModal , setOpenSignupModal] = useState(false);
  const [openLoginModal , setOpenLoginModal] = useState(false);
  const [user , setUser] = useState(null)
  
  const reduxData = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(()=>{
    //snapshot here keeps an regular eye on collection , whenever we add an data in posts collection , we can get it through snapshot
     db.collection('Posts')
     .orderBy('timeStamp', 'desc')
     .onSnapshot((snapshot)=>{
      setPosts(snapshot.docs.map((doc)=>(
       {
         id : doc.id,
         post :  doc.data()
       })
      ))});
  },[])
  const dataFromFirebase = useMemo(()=>{
      return firebase.auth().currentUser;
  },[firebase.auth().currentUser])
  
  useEffect(()=>{
    
    if(reduxData?.userInfo){
      setUser(reduxData?.userInfo);
    }else if(dataFromFirebase){
      setUser(dataFromFirebase);
    }else{
      setUser(null);
    }

  },[reduxData?.userInfo ,dataFromFirebase])

  useEffect(()=>{
    if(dataFromFirebase){
      let unSubscribe;
       unSubscribe = db
       .collection('usersData')
       .onSnapshot((snapshot)=>{
          dispatch(setUsersData(snapshot.docs.map((doc)=>(
          
           {
             id : doc?.id,
             usersInfo :  doc?.data()
           })
           
           )))
           let newFollowingUsers = [];
           snapshot.docs.map((doc)=>{
            
            if(doc?.data() && doc?.data()?.userFollowings && doc?.data()?.userFollowings?.length>0 && doc?.data()?.userFollowings?.includes(dataFromFirebase?.uid)){
              newFollowingUsers = [...newFollowingUsers,  doc?.data()?.userId];
            }
            
          })
          dispatch(setFollowingUsers(newFollowingUsers))
       })
  
  
      
      return ()=>unSubscribe()
    }
 },[dataFromFirebase])
  const getFilteredPosts = () => {
    if(reduxData && (!reduxData?.userInfo || !reduxData.followingUsers?.length || (reduxData?.followingUsers?.length === 1 && reduxData?.followingUsers?.[0] === dataFromFirebase?.uid))){
      return posts;
    }else if(reduxData && reduxData?.followingUsers && reduxData?.followingUsers?.length && posts  && posts?.length>0){
      const filteredPosts = posts?.filter(postData => (reduxData?.followingUsers?.includes(postData?.post?.userId) || postData?.post?.userId === dataFromFirebase?.uid));
      return filteredPosts
    }else{
      return [];
    }
    
  }
  return (
   
    <div className="app">
       <SignupModal openSignupModal = {openSignupModal} setOpenSignupModal = {setOpenSignupModal} setUser= {setUser} user = {user}/>
       <LoginModal openLoginModal = {openLoginModal} setOpenLoginModal = {setOpenLoginModal} setUser= {setUser} user = {user}/>
      
     <Header user = {user} setOpenSignupModal = {setOpenSignupModal} setOpenLoginModal = {setOpenLoginModal}/>
     <MessagePost user = {user}/>
     <div className='all-posts'>
    {
      getFilteredPosts()?.map(({id,post})=>
        <Post 
        key = {id}
        postId = {id}
        userName={post?.userName}
        userImage={post?.userImage}
        postMessage={post?.postMessage}
        setOpenLoginModal = {setOpenLoginModal}
        postUserId={post?.userId}
        />
      )
    }
    </div>
    </div>
    
  );
}

export default App;
