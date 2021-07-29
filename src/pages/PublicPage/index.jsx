import {
    Backdrop, Box,
    Button, Container, Fade, makeStyles, Modal
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InfoBox from 'features/TrackersGlobalMap/components/InfoBox';
import { prettyPrintStat } from "features/TrackersGlobalMap/components/util";
import numeral from "numeral";
import News from 'pages/News';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    wrapper: {
        paddingTop: '2rem',
        textAlign: 'center',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'var(--primary-color)',
        padding: '0.5rem 1rem',
    },
    headTitle: {
        fontSize: '3rem',
        fontWeight: '550',
        color: 'var(--white-color)',

        textAlign: 'center',
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
        justifyContent: 'space-between',
        border: '1px solid',
        padding: '5px 8px',
        borderRadius: '5px', 
        color: '#fff',
        background: '#333'

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
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        margin: '0 1rem',
        borderRadius: '10px'
    },
    news_content: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'center', 
        flexWrap:'wrap',
        alignItems: 'center',
    }

}))
function PublicPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true); 

    const [casesType, setCasesType] = useState("cases");
    const [countryInfo, setCountryInfo] = useState({});

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

    // Get stats
    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

    return (
        <>
        <div className={classes.header}>
                <h1 className={classes.headTitle}>Covid19 - Tracker Website </h1>
                <Button color="#fff" onClick={handleClickOpen}>
                    <div className={classes.logged}>
                        <AccountBoxIcon className={classes.menuButton} />
                        <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>Sign In</span>
                    </div>
                </Button>
        </div>
            
            <Container className={classes.wrapper}>
                <div className="tracker-content__stats">
                    <InfoBox
                        onClick={(e) => setCasesType("cases")}
                        title="Coronavirus Cases"
                        isRed
                        active={casesType === "cases"}
                        cases={prettyPrintStat(countryInfo.todayCases)}
                        total={numeral(countryInfo.cases).format("0.0a")}
                    />
                    <InfoBox
                        onClick={(e) => setCasesType("recovered")}
                        title="Recovered"
                        active={casesType === "recovered"}
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                        total={numeral(countryInfo.recovered).format("0.0a")}
                    />
                    <InfoBox
                        onClick={(e) => setCasesType("deaths")}
                        title="Deaths"
                        isRed
                        active={casesType === "deaths"}
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        total={numeral(countryInfo.deaths).format("0.0a")}
                    />
                </div>
                

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
        </>
    );
}

export default PublicPage;