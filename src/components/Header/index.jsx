import {
    AppBar, Button, makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp'
import ImgLogo from 'assets/img/anticovid-icon.png'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    appbar: {
        backgroundColor: 'var(--primary-color)',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    maintitle: {

    },
    mainLogo: {
        color: 'white',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '1.8rem',
        textTransform: 'uppercase',
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
        color: 'white',
        fontWeight: '550',
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
    logo: {
        width: '100%',
        maxWidth: '80px'
    },
    language_select: {
    }

}))

export default function Header(props) {
    const { isLoggedIn } = props
    const dispatch = useDispatch()
    const history = useHistory()
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
        localStorage.clear();
        history.push('/');
        handleCloseMenu()
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to="/">
                            <div className={classes.mainLogo}>
                                <img className={classes.logo} src={ImgLogo} />
                                <h2 className={classes.maintitle}>Covid Tracker</h2>
                            </div>
                        </Link>
                    </Typography>
                    {!isLoggedIn ? (
                        <>

                            {/* <Button color="inherit" onClick={handleClickOpen}>
                                <div className={classes.logged}>
                                    <AccountBoxIcon className={classes.menuButton} />
                                    <span style={{ textTransform: 'none' }}>Sign-in / Sign-up</span>
                                </div>
                            </Button> */}
                        </>
                    ) : (
                        <div style={{ textAlign: 'right' }}>
                            <Button style={{ marginRight: '15px' }}>
                                <Link className={classes.menuItem} to="/news">
                                    News
                                </Link>
                            </Button>
                            <Button style={{ marginRight: '15px' }}>
                                <Link className={classes.menuItem} to="/trackers">
                                    Trackers
                                </Link>
                            </Button>


                            {/* <Link style={{ marginRight: '10px' }} className={classes.menuItem} to="/">
                                     Welcome Admin
                                    </Link>  */}
                            <Button
                                color="inherit"
                                className={classes.personLog}
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleShowMenu}
                                className={classes.language_select}
                            >VN / EN
                                <ArrowDropDownSharpIcon />
                            </Button>
                            <Button
                                color="inherit"
                                className={classes.personLog}
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleShowMenu}
                            >

                                <AccountBoxIcon />
                                {/* <ArrowDropDownSharpIcon /> */}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                {/* <MenuItem onClick={handleCloseMenu}>Profile</MenuItem> */}
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}