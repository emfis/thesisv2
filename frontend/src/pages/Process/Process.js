
import * as React from 'react';
import { Button,Grid,Paper,Input, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dashboard from "../../templates/dashboard/Dashboard";
import { makeStyles } from '@material-ui/core/styles';
import ImageEditor from "../../components/ImageEditor/ImageEditor";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
  },
  paper: {
    padding: "2em",
    margin: "2em",
  },
  button:{
    display: "block",
    margin: "1em 0"
  }
}));

function Process() {
  const classes = useStyles();
  const [imageSrc, setImageSrc] = React.useState('');
  const canvasRef = React.useRef(null);
  const [message, setMessage] = React.useState({error: false,message: ""});

  function handleImageChange(e) {
    if(e.target.files[0]){
      setImageSrc(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function handleProcess(){
    setMessage({error: false,message: ""});
    const dataURL = canvasRef.current.toDataURL();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: dataURL })
    };
    const response = await fetch("http://localhost:9000/user/saveImage", requestOptions);
    if (response.ok) {
      setMessage({error: false, message: "Successfully processed and saved"})
    } else {
      setMessage({error: true, message: "There was an error"})
    }
  }

  return (
    <Dashboard>
      <Grid className={classes.container} container justify="center">
        <Grid xs={12} item>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              Select image
            </Typography>

              <Input  type="file" name="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange}/>
              {imageSrc && (
                <>
                  <ImageEditor ref={canvasRef} imageSrc={imageSrc}/>
                  <Typography variant="subtitle2" className={classes.title}>
                    Remember that you can draw over the image preview to help AI
                  </Typography>
                </>
              )}
              <Button className={classes.button} color="primary" variant="contained" onClick={()=>handleProcess()}>Process</Button>
              
              { message.message && (
                <Alert severity={message.error ? "error" : "success"}>
                  <AlertTitle>{message.error ? "Error" : "Success"}</AlertTitle>
                  {message.message}
                </Alert>
                )
              }
          </Paper>
        </Grid>
      </Grid>
    </Dashboard>
  );
}

export default Process;
