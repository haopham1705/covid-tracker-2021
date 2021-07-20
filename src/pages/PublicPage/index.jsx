import {
    AppBar,
    Badge,
    Box,
    Button,
    Dialog,
    DialogActions,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Modal,
    Backdrop,
    Fade,
    Container
} from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import News from 'components/News'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    link: {
        color: 'white',
    },
    logged: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    redirect: {
        textTransform: 'unset'
    },
    personLog: {
        backgroundColor: '#2e40a2'
    },
    menuItem: {
        color: 'white'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

}))
function PublicPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true); 
    const history = useHistory();
 

    const handleUsername = (inputUsername) => {
        setUsername(inputUsername.target.value);
    };

    const handlePassword = (inputPassword) => {
        setPassword(inputPassword.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (username !== '' && password !== '') {
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                history.push('/overview');
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
    };
  
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState('login')
    // const [anchorEl, setAnchorEl] = useState(null)

    // const handleShowMenu = (event) => {
    //     setAnchorEl(event.currentTarget)
    // }

    // const handleCloseMenu = () => {
    //     setAnchorEl(null)
    // }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleRedirectLogin = () => {
        setMode('login')
    }

    const handleRedirectRegister = () => {
        setMode('register')
    }

    return (
        <Container className="main-content">
            <Button color="inherit" onClick={handleClickOpen}>
                <div className={classes.logged}>
                    <AccountBoxIcon className={classes.menuButton} />
                    <span style={{ textTransform: 'none' }}>Sign-in / Sign-up</span>
                </div>
            </Button>

            <News />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {mode === 'register' && (
                            <>
                                <RegisterForm />
                                <Box textAlign="right" className={classes.menuButton}>
                                    <Button
                                        className={classes.redirect}
                                        onClick={handleRedirectLogin}
                                        color="primary"
                                    >Already have an account? Sign in
                                    </Button>
                                </Box>
                            </>
                        )}
                        {mode === 'login' && (
                            <>
                                <LoginForm />
                                <Box textAlign="right" className={classes.menuButton}>
                                    <Button
                                        className={classes.redirect}
                                        onClick={handleRedirectRegister}
                                        color="primary"
                                    >
                                        Don't have an account? Sign Up
                                    </Button>
                                </Box>
                            </>
                        )}
                    </div>
                </Fade>
            </Modal>
        </Container>
    );
}

export default PublicPage;