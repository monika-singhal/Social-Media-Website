import { Avatar, Button, Card, CardContent, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';


const MessagePost = ({user}) => {
  const [message , setMessage] = useState('');
  const generateUserImage = (userName) => {
    // Replace spaces with underscores and convert to lowercase
    const formattedName = userName && userName.split(' ')?.length>0 && userName.split(' ')[0]?.toLowerCase();
    // Assuming your images are stored in a directory named 'user_images'
    return `/user_images/${formattedName}.jpg`;
  };
  const handlePostSubmit = (e)=>{
    e.preventDefault();
     db.collection('Posts').add({
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      postMessage : message,
      userName : user?.displayName,
      userImage : generateUserImage(user?.displayName),
      userId : user?.uid
    })
    .then((docRef) => {
      // Data has been successfully added to the collection
      // Reset the message
      setMessage('');
    })
    .catch((error) => {
      console.error('error in posting message');
    });
    // setMessage('')

    

  }
  return (
    <Card variant="outlined" style={{ marginBottom: 16 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              alt="User Avatar"
              src={generateUserImage(user?.displayName)}// Replace with the actual image source
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              multiline
              placeholder={`Hii ${user?.displayName??''}, What's in your mind?`}
              variant="outlined"
              size="small"
              value={message}
              onChange={(e)=>setMessage(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick = {handlePostSubmit}>
              Post
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};


export default MessagePost;