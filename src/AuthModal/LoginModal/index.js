import { Button, Grid, Input, Modal, Paper, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';



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

const LoginModal = ({ openLoginModal, setOpenLoginModal, user, setUser }) => {
  const classes = useStyles();
 
  const [password, setPassword] = useState('');
  
  const [email, setEmail] = useState('');
 
  
  
  const handleLogin = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((err)=> alert(err.message));

    setOpenLoginModal(false);
  };

  return (
    <Modal
      open={openLoginModal}
      onClose={()=>{setOpenLoginModal(false)}}
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
                placeholder="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          </Grid>
          <Button
            style = {{marginTop:'16px'}}
            onClick={handleLogin}
            type = 'submit'
          >
            Login
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default LoginModal;
