
import * as React from 'react';
import Dashboard from "../../templates/dashboard/Dashboard";
import { Grid, Paper, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  paper: {
    padding: "0.7em",
    margin: "0.2em",
  },
  image: {
    width: "100%",
  },
  grid: {
    margin: "2em 0",
  },
  info: {
    margin: "10%",
  }
}));

function Library() {
  const classes = useStyles();
  const [error, setError] = React.useState({error: false,message: ""});
  const [imageNames, setImageNames] = React.useState([]);

  async function fetchImageNames(){
    setError({error: false,message: ""});
    const response = await fetch("http://localhost:9000/user/getImageNames");
    if (!response.ok) {
      setError({error: true, message: "Could not load image names"})
    } else {
      const data = await response.json();
      setImageNames(data.imageNames);
    }
  } 

  React.useEffect(()=>{
    fetchImageNames();
  },[]);

  async function deleteImage(image){
    const requestOptions = {
      method: 'DELETE',
    };
    fetch(`http://localhost:9000/user/${image}`, requestOptions).then(()=>{
      fetchImageNames();
    });
  }

  return (
    <Dashboard>
      <Grid className={classes.container} container justify="center">
        { error.message && (
          <Alert severity={"error"}>
            <AlertTitle>{"Error"}</AlertTitle>
            {error.message}
          </Alert>
          )
        }
        { !imageNames.length && (
          <Alert className={classes.info} severity="info">
            <AlertTitle>Your library is empty, process an image to see the result here.</AlertTitle>
          </Alert>
        )

        }
        { imageNames.map((imageName,i)=>(
            <Grid key={i} className={classes.grid} md={4} xs={12} item>
              <Paper elevation={3} className={classes.paper}>
                <a href={`http://localhost:9000/user/${imageName}`} target="_blank" rel="noreferrer">
                  <img className={classes.image} alt="Database processed" src={`http://localhost:9000/user/${imageName}`}/>
                </a>
                <Button variant="contained" color="secondary" onClick={()=>deleteImage(imageName)}>Delete</Button>
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </Dashboard>
  );
}

export default Library;
