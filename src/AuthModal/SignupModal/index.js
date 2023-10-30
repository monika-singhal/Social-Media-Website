import { Button, Grid, Input, Modal, Paper, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../Redux/actions/actions';
import firebase from 'firebase/compat/app';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 300,
    padding: 20,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    margin: '0 auto 20px',
  },
}));

const SignupModal = ({ openSignupModal, setOpenSignupModal, user, setUser }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
 
  
  useEffect(()=>{
    //this event listner will listner for any single time for any authentication chnage happens. like
    // you login and logout and create user this listner will listen. We use them for database

    //unSubscribe use - what happens if user or username change 10 times so onAuthStateChanged adds 10 eventlistners that is not good .
    // we need to clean this
     const unsubscribe =  auth.onAuthStateChanged((authUser)=>{
        if(authUser){
          //user has loggedIn...
          //here if you notice that it is persistent even after refresh like you login and refresh  because it uses cookie tracking.
          // onAuthStateChanged do a cookie tracking means keeps you logged in even after refresh.
          setUser(authUser);
          dispatch(setUserInfo(authUser))
          // if(authUser.displayName){
          //   //don't update user name
          // }else{
          //   //if we just create someone.
          //   // authUser.updateProfile means go to the user that is just loggedIn with update the profile and it adds in firebase
          //   // as an attribute
          //   authUser.updateProfile({
          //     displayName : username
          //   })
          // }
          
        }else{
          //user has logged out..
          setUser(false);
          dispatch(setUserInfo(false))
        }
      })
      return () => {
        unsubscribe()
      };
  },[user , username])
  const handleSignup = (event) => {
    event.preventDefault();
    //for creating user in firebase
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
      setOpenSignupModal(false)
      db.collection('usersData').add({
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        userName : username,
        userEmail : email,
        userFollowings : [authUser?.user?.uid],
        userId : authUser?.user?.uid
      })
      return authUser.user.updateProfile({
        displayName : username
      })

    })
    .catch((err)=>
      alert(err.message)
    )
    //err.message is backend validation . Can we do also from frontend
    
  };

  return (
    <Modal
      open={openSignupModal}
      onClose={()=>{setOpenSignupModal(false)}}
      className={classes.modal}
    >
      <Paper className={classes.paper}>
        <img
          className={classes.logo}
          src="/your-social-media-logo.png" // Replace with your logo image URL
          alt="Social Media Logo"
        />
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                placeholder="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                placeholder="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                placeholder="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            style = {{marginTop:'16px'}}
            onClick={handleSignup}
            type = 'submit'
          >
            Signup
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default SignupModal;
