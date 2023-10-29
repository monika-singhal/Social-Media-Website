// EditMessageModal.js
import React, { useState } from 'react';

import { Box, Button, Modal, TextField } from '@material-ui/core';
import { db } from '../firebase';

const EditMessageModal = ({ message, clickEditMessage,setClickEditMessage, onClose ,postId }) => {
  const [updatedMessage, setUpdatedMessage] = useState(message);

  const handleSave = (e) => {
     e.preventDefault();
     const docRef = db.collection('Posts').doc(postId);
     docRef?.get()?.then(function(doc) {
        //  console.log("docRef====",doc)
        // console.l
        if (doc.exists) {
            
            docRef?.update({
              postMessage : updatedMessage
            })
            .then(()=>{
                setClickEditMessage(false);
            //   alert("Message updated successfuly");
             
            })
            .catch((err)=>{
              console.log("error in updating")
            })
          } else {
            console.log("Document does not exist.");
          }
     })
    // onSave(updatedMessage);
    // onClose();
  };

  return (
    <Modal open={clickEditMessage} onClose={()=>{setClickEditMessage(false)}}>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          backgroundColor: 'white',
          padding : '20px'
          
        }}
      >
        <TextField
          label="Edit Message"
          fullWidth
          variant="outlined"
          value={updatedMessage}
          onChange={(e) => setUpdatedMessage(e.target.value)}
          multiline
          maxRows={6}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditMessageModal;
