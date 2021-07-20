import { yupResolver } from '@hookform/resolvers/yup'
import {
    Avatar, Container,
    CssBaseline,
    Grid,
    LinearProgress,
    makeStyles,
    Typography
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ButtonField from 'components/form-controls/ButtonField'
import InputField from 'components/form-controls/InputField'
import PasswordField from 'components/form-controls/PasswordField'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    linePro: {
        width: '100%'
    }
}))

export default function LoginForm({ onSubmit }) {
    const classes = useStyles()

    const schema = yup.object().shape({
        identifier: yup
            .string()
            .required('Please enter your email')
            .email('Please enter a valid email address'),
        password: yup
            .string()
            .required('Please enter password')
            .min(6, 'Please enter at least 6 characters')
    })

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: ''
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    })

    const { formState } = form

    const { isSubmitting } = formState

    const handleRegisterSubmit = async (formValues) => {
        await onSubmit?.(formValues)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ExitToAppIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng nhập tài khoản
                </Typography>
                {isSubmitting && <LinearProgress className={classes.linePro} />}
                <form className={classes.form} onSubmit={form.handleSubmit(handleRegisterSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputField form={form} name="identifier" label="Email" />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordField form={form} name="password" label="Mật khẩu" />
                        </Grid>
                    </Grid>
                    <ButtonField
                        classNameButton={classes.submit}
                        text="Đăng nhập"
                        disabled={isSubmitting}
                    />
                </form>
            </div>
        </Container>
    )
}
