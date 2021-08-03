import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'; 
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { GlobalActions } from 'redux/slices/globalSlice'
import { Opacity } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'var(--primary-color)',
        color: '#fff',
        fontWeight: '600'
    }, 
}));

export default function LoginForm() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        if (username !== '' && password !== '') {
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('username', username)
                localStorage.setItem('password', password)
                console.log('login success')
                history.push('/')
            } else {
                setMsg("Please enter correct username & password")
            }
        }
    }

    useEffect(() => {
        dispatch(GlobalActions.showLoading())
        setTimeout(() => {
            dispatch(GlobalActions.showLoading())
        }, 1200)
    }, [])

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountBoxIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Username"
                            label="Username"
                            name="Username"
                            autoComplete="Username"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button> 
                    </form>
                </div>
            </Container>
        </div>
    )
}
