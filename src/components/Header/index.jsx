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
    Fade
} from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox' 
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp' 
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import LogInPage from 'pages/LogInPage'

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

export default function Header(props) {
    const { isLoggedIn } = props 
    const dispatch = useDispatch()
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState('login')
    const [anchorEl, setAnchorEl] = useState(null)

    const handleShowMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

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

    const handleLogout = () => {
        // const action = logout()

        // dispatch(action)
        // enqueueSnackbar('Logout successfully!', { variant: 'success' })
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to="/">
                            Covid-Tracker
                        </Link>
                    </Typography>
                    {!isLoggedIn ? (
                        <>
                            <Button color="inherit" onClick={handleClickOpen}>
                                <div className={classes.logged}>
                                    <AccountBoxIcon className={classes.menuButton} />
                                    <span style={{ textTransform: 'none' }}>Sign-in / Sign-up</span>
                                </div>
                            </Button>
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
                                                <LogInPage />
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
                        </>
                    ) : (
                        <div style={{ textAlign: 'right' }}>
                                <Button style={{ marginRight: '15px' }}>
                                    <Link className={classes.menuItem} to="/">
                                        News
                                    </Link>
                                </Button>
                                <Button style={{ marginRight: '15px' }}>
                                    <Link className={classes.menuItem} to="/">
                                        Chart
                                    </Link>
                                </Button>
                               
                                    
                                <Link style={{ marginRight: '10px' }} className={classes.menuItem} to="/">
                                     Welcome Admin
                                    </Link>
                                
                                
                               
                            <Button
                                color="inherit"
                                className={classes.personLog}
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleShowMenu}
                            >
                               
                                <AccountBoxIcon />
                                <ArrowDropDownSharpIcon />
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
