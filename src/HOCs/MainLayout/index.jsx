import { Select } from '@material-ui/core';
import {
    AppBar, Button, CssBaseline,
    Divider, Drawer, IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, makeStyles, Menu,
    MenuItem,
    Toolbar,
    Typography, useTheme
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ImgLogo from 'assets/img/globe-logo2.gif';
import clsx from 'clsx';
import ThemeContext from 'context/Context';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import i18n from 'utils/translation/i18n';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: theme.palette.text.primary,
    },
    appbar: {
        background: theme.palette.primary.main,
        height: 70,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    maintitle: {
        fontSize: '1.3rem',
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    textLogo: {
        marginLeft: 9,
        color: theme.palette.text.primary,
    },
    mainLogo: {
        color: '#fff',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textTransform: 'uppercase',
    },
    headerMenu: {
        display: 'flex'
    },
    logged: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    redirect: {
        textTransform: 'unset'
    },
    personLog: {
        backgroundColor: theme.palette.primary,
    },
    menuItem: {
        color: theme.palette.text.primary,
        fontWeight: '550',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // paper: {
    //     backgroundColor: theme.palette.background.paper,
    //     border: '2px solid #000',
    //     boxShadow: theme.shadows[5],
    //     padding: theme.spacing(2, 4, 3),
    // },
    logoImg: {
        width: '100%',
        maxWidth: '65px',
        margin: '5px',
    },
    language_select: {
        width: '55%',
        textAlign: 'center',
    },

    menuButton: {
        marginRight: 5,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

}))

export default function Header({ children }, ...props) {
    const { isLoggedIn } = props
    const { handleDrawerToggle } = props;
    const { t } = useTranslation()
    const { isDark, toggleDarkMode } = useContext(ThemeContext);
    const dispatch = useDispatch()
    const history = useHistory()
    const theme = useTheme()
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState('login')
    const [anchorEl, setAnchorEl] = useState(null)
    const [lang, setLang] = useState('en')

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

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    // Change language
    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
        setLang(e.target.value);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />

            <AppBar position="fixed" className={clsx(classes.appbar, {
                [classes.appBarShift]: open,
            })}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />

                    </IconButton>
                    <Typography variant="h6" className={clsx(classes.textLogo, open && classes.hide)}>
                        <Link className={classes.link} to="/">
                            <div className={classes.mainLogo}>
                                <img className={classes.logoImg} src={ImgLogo} />
                                <h2 className={classes.maintitle}>Covid Tracker</h2>
                            </div>
                        </Link>
                    </Typography>

                    <div className={clsx(classes.headerMenu, open && classes.hide)}>

                        <IconButton
                            onClick={toggleDarkMode}
                        // className={classNames({ [classes.initAppbarElement]: !showAppBar })}
                        >
                            {isDark ?
                                <Brightness7Icon color="inherit" />
                                : <Brightness4Icon color="inherit" />}
                        </IconButton>
                        <Button
                            color="inherit"
                            className={classes.personLog}
                            aria-controls="profile_menu"
                            aria-haspopup="true"
                            onClick={handleShowMenu}
                        >
                            <AccountBoxIcon />
                            <ArrowDropDownSharpIcon />
                        </Button>
                        <Menu
                            id="profile_menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            {/* <MenuItem onClick={handleCloseMenu}>Profile</MenuItem> */}
                            <MenuItem onClick="">{t('content.profille')}</MenuItem>
                            <MenuItem onClick={handleLogout}>{t('content.logout')}</MenuItem>
                        </Menu>
                    </div>
                    {/* )} */}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >

                <div className={classes.drawerHeader}>
                    <Select
                        onChange={changeLanguage}
                        value={lang}
                        displayEmpty
                        className={classes.language_select}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="vi">Tiếng Việt</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                    </Select>


                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>

                </div>

                <Divider />
                <List>
                    <Link className={classes.menuItem} to="/">
                        <ListItem button>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText>{t('content.home')}</ListItemText>
                        </ListItem>
                    </Link>
                    <Link className={classes.menuItem} to="/news">
                        <ListItem button>
                            <ListItemIcon><ReceiptIcon /></ListItemIcon>
                            <ListItemText>{t('content.news')}</ListItemText>
                        </ListItem>
                    </Link>
                    <Link className={classes.menuItem} to="/trackers">
                        <ListItem button>
                            <ListItemIcon><AssessmentIcon /></ListItemIcon>
                            <ListItemText>{t('content.chart')}</ListItemText>
                        </ListItem>
                    </Link>
                    {/* <Link className={classes.menuItem} to="/global">
                        <ListItem button>
                            <ListItemIcon><SettingsApplicationsIcon /></ListItemIcon>
                            <ListItemText>{t('content.setting')}</ListItemText>
                        </ListItem>
                    </Link> */}
                </List>
                <Divider />
            </Drawer>
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                {children}
            </main>
        </div>
    )
}