import React, { useEffect, useState } from 'react'
import './Post.css';
import firebase from 'firebase/compat/app';
import Avatar from '@material-ui/core/Avatar'
import { db } from '../firebase';
import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import EditMessageModal from '../EditPostModal';
import { HeartIcon } from '../SvgIcons';


function Post({userName , postMessage , userImage , postId, setOpenLoginModal, postUserId }) {
  const [comments , setComments] = useState([]);
  const [commentAdded , setCommentAdded] = useState('');
  const [postLikes , setPostLikes] = useState(0);
  const [clickEditMessage , setClickEditMessage] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const reduxData = useSelector((state) => state);
  const loginUser = reduxData?.userInfo?.displayName;
  useEffect(()=>{
     let unSubscribe;
     if(postId){
      unSubscribe = db
      .collection('Posts')
      .doc(postId)
      .collection('Comments')
      .onSnapshot((snapshot)=>{
        setComments(snapshot.docs.map((doc)=>(
          {
            id : doc?.id,
            CommentsInfo :  doc?.data()
          })))
      })


     }
     return ()=>unSubscribe()
  },[postId])
  useEffect(()=>{
   
  if(postId){
    const docRef = db.collection('Posts').doc(postId);
    docRef.get().then(function(doc) {
     if (doc.exists) {
       var currentValue = doc?.data()?.Likes;
       setPostLikes(currentValue??1)
     }})
  }
 },[postId])

  const handleAddComment = (e)=>{
    if(!loginUser){
      setOpenLoginModal(true);
      return;
    }
    e.preventDefault();
    db
    .collection('Posts')
    .doc(postId)
    .collection('Comments')
    .add({
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
       userName : loginUser,
       comment : commentAdded

    })
    setCommentAdded("");
  }
  const handleLikePost = (e) =>{
    if(!loginUser){
      setOpenLoginModal(true);
      return;
    }
    if(isLiked){
      return;
    }
    // e.preventDefault();
    const docRef = db.collection('Posts').doc(postId);
         docRef.get().then(function(doc) {
          if (doc.exists) {
            var currentValue = doc?.data()?.Likes;
            docRef?.update({
              Likes : currentValue ? currentValue +1 : 1
            })
            .then(()=>{
             console.log("liked successfully")
            })
            .catch((err)=>{
              console.log("error in liked button")
            })
          } else {
            console.log("Document does not exist.");
          }
        }).catch(function(error) {
          console.error("Error getting document:", error);
        });
    
    setIsLiked(true);
  }
  return (
    <>
    <EditMessageModal setClickEditMessage = {setClickEditMessage} clickEditMessage = {clickEditMessage} message = {postMessage} postId = {postId}/>
    <div className='post'>
      <div className='post-header'>
      <Avatar
       src = {userImage}
       alt = {userName}
       className='post-user-image'
      />
      <h3 className='post-username'>{userName}</h3>
      {postUserId === reduxData?.userInfo?.uid && <Button
      variant="contained"
      style = {{display: 'flex', flexDirection:'column', justifyContent:'end', marginLeft:'50%'}}
      // color="primary"
      onClick={()=>{setClickEditMessage(true)}}
      >
        Edit Post
      </Button>}
      </div>
      <div className='post-message'>
      {postMessage}
      </div>
      <div className="post-comments">
         {comments && comments?.length>0 &&<div className='comments'> Comments</div>}
          {comments && comments?.length>0 && comments?.map((comment, index) => (
            <div key={index} className="post-comment">
              <div className='user-name-comment'>{ comment?.CommentsInfo?.userName} </div>
              {comment?.CommentsInfo?.comment}
            </div>
          ))}
        </div>
        <div className='comments-container'>
       
          {/* <Favorite color="primary" /> */}
          <div onClick={handleLikePost}><HeartIcon filled={isLiked} /> {(isLiked ? postLikes +1 : postLikes)}</div> 

      <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Add a comment"
              value={commentAdded}
              onChange={(e)=>{setCommentAdded(e.target.value)}}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              // style={{ height: '100%' }}
            >
              Add Comment
            </Button>
          </Grid>
        </Grid>
        </div>
     

        {/* Display Comments */}
       
     
      
    </div>
    </>
  )
}

export default Post
