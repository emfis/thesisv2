
import * as React from 'react';
import './Login.css';
import { Button, CssBaseline, TextField, Container, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { login } from "../../services/login";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
  const [loginValue,setLoginValue] = React.useState('');
  const [passwordValue,setPasswordValue] = React.useState('');
  const [error, setError] = React.useState('');
  const history = useHistory();
  
  async function handleLogin(){
    setError('');
    const response = await login({login: loginValue, password: passwordValue});
    if (response.error) {
      setError(response.error);
    } else {
      window.sessionStorage.setItem("token", response.token);
      history.push("/")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Nucleus segmentation portal
        </Typography>
        {error && <Alert className={classes.submit} severity="error">{error}</Alert>}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="login"
            autoFocus
            onChange={(e)=>setLoginValue(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPasswordValue(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>handleLogin()}
          >
            Log In
          </Button>
        </form>
        <Typography component="p" variant="subtitle2">
          Jeremiasz Mozgwa thesis 2021
        </Typography>
      </div>
   </Container>
  );
}

export default Login;
