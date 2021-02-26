import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container, IconButton, Tooltip } from '@material-ui/core';
import { Redirect, useHistory } from "react-router-dom";
import { isLoggedIn } from "../../services/user";
import { 
  PhotoLibrary as ImageIcon,
  ExitToApp as ExitToAppIcon,
  ImageAspectRatio as UploadImageIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
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
  image: {
    width: "100%"
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2em"
  }
}));

function Dashboard (props) {
  const classes = useStyles();
  const isUserLoggedIn = isLoggedIn();
  const history = useHistory();

  function handleLogout() {
    window.sessionStorage.removeItem('token');
    history.push('/login');
  }

  function handleReroute(route) {
    history.push(route);
  }

  if (!isUserLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }

  return(
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>

          <Tooltip title="Edit and upload">
          <IconButton aria-label="show 4 new mails" color="inherit" onClick={()=>handleReroute("/")}>
            <UploadImageIcon />
          </IconButton>
          </Tooltip>
          <Tooltip title="Processed image library">
            <IconButton aria-label="show 4 new mails" color="inherit"  onClick={()=>handleReroute("/library")}>
              <ImageIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={()=>handleLogout()}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>


      <Container>
        {props.children}
      </Container>
    
    </>
  ); 
}

export default Dashboard;