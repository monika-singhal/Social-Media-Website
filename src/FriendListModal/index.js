import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, Modal, Paper, Typography, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { db } from '../firebase';


const FriendListModal = ({ setAddFriendModal, addFriendsModal ,currentUser ,setOpenLoginModal}) => {
    const [suggestedUsers, setSuggestedUsers] = useState(null);
    const [friendAdded , setFriendAdded] = useState([]);

    useEffect(()=>{
        let unSubscribe;
         unSubscribe = db
         .collection('usersData')
         .onSnapshot((snapshot)=>{
            setSuggestedUsers(snapshot.docs.map((doc)=>(
            
             {
               id : doc?.id,
               usersInfo :  doc?.data()
             })
             
             ))
             
             snapshot.docs.map((doc)=>(
              doc?.data() && doc?.data()?.userFollowings && doc?.data()?.userFollowings?.length>0 && doc?.data()?.userFollowings?.includes(currentUser?.uid) &&
              setFriendAdded(prevState => [...prevState, doc?.data()?.userId])
              ))
         })
   
   
        
        return ()=>unSubscribe()
     },[])

  
     const generateUserImage = useCallback((userName) => {
        // Replace spaces with underscores and convert to lowercase
        const formattedName = userName && userName.split(' ')?.length>0 && userName.split(' ')[0]?.toLowerCase();
        // Assuming your images are stored in a directory named 'user_images'
        return `/user_images/${formattedName}.jpg`;
      },[]);
    const onAddFriendClick = async(docId , userId)=> {
         if(!currentUser){
            setOpenLoginModal(true);
            return;
         }
         const docRef = db.collection('usersData').doc(docId);
         docRef.get().then(function(doc) {
          if (doc.exists) {
            var currentValue = doc?.data()?.userFollowings;
            docRef?.update({
              userFollowings : [...currentValue, currentUser?.uid]
            })
            .then(()=>{
              setFriendAdded( [...friendAdded, userId]);
            })
            .catch((err)=>{
              console.log("error in updating")
            })
          } else {
            console.log("Document does not exist.");
          }
        }).catch(function(error) {
          console.error("Error getting document:", error);
        });

    }
  return (
    <Modal
      open={addFriendsModal}
      onClose={()=>{setAddFriendModal(false)}}
      aria-labelledby="friend-list-modal-title"
      aria-describedby="friend-list-modal-description"
    //   style = {{position: 'fixed', top: '0px', left:'0px', zIndex: '2'}}
    >
        
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
         background: "white",
        //   width: "200px", height:"200px"
        }}
      >
        <Typography variant="h6" id="friend-list-modal-title" gutterBottom style = {{backgroundColor:'lightgray'}}>
          Friend List
        </Typography>
        <List style = {{height : '400px', overflowY:'scroll'}}>
          {suggestedUsers && suggestedUsers?.length>0 &&suggestedUsers.map((user) => {
            // if(user && user?.usersInfo?.userFollowings && user?.usersInfo?.userFollowings?.length>0 && user?.usersInfo?.userFollowings?.includes(currentUser?.uid))
            // return null;
            return(
                <ListItem key={user?.id}>
                <ListItemAvatar>
                  <Avatar alt={user?.usersInfo?.userName} src={generateUserImage(user?.usersInfo?.userName)} />
                </ListItemAvatar>
                <ListItemText primary={user?.usersInfo?.userName} secondary={user?.usersInfo?.userEmail} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onAddFriendClick(user?.id , user?.usersInfo?.userId)}
                  disabled = {friendAdded && friendAdded?.length>0 && friendAdded.includes(user?.usersInfo?.userId)}
                >
                 { (friendAdded && friendAdded?.length>0 && friendAdded.includes(user?.usersInfo?.userId) ) ?"Added":"Add Friend"}
                </Button>
              </ListItem>
            )
            
         })}
        </List>
      </Box>
    </Modal>
  );
};

export default FriendListModal;
