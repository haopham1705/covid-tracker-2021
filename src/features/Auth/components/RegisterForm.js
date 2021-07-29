import { yupResolver } from '@hookform/resolvers/yup'
import {
    Avatar,
    Container,
    CssBaseline,
    Grid,
    LinearProgress,
    makeStyles,
    Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ButtonField from 'components/form-control/ButtonField'
import InputField from 'components/form-control/InputField'
import PasswordField from 'components/form-control/PasswordField'
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

export default function RegisterForm({ onSubmit }) {
    const classes = useStyles()

    const schema = yup.object().shape({
        firstName: yup
            .string()
            .required('Họ không được bỏ trống')
            .min(2, 'Bạn nhập quá ngắn, vui lòng nhập lớn hơn hoặc bằng 2 ký tự!'),
        lastName: yup
            .string()
            .required('Tên không được bỏ trống')
            .min(2, 'Bạn nhập quá ngắn, vui lòng nhập lớn hơn hoặc bằng 2 ký tự'),
        email: yup
            .string()
            .required('Email không được bỏ trống')
            .email('Email bạn nhập không đúng định dạng'),
        password: yup
            .string()
            .required('Mật khẩu không được bỏ trống')
            .min(6, 'Mật khẩu quá ngắn, vui lòng nhập lớn hơn hoặc bằng 6 ký tự'),
        retypePassword: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu trên')
            .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
    })

    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            retypePassword: ''
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                {isSubmitting && <LinearProgress className={classes.linePro} />}
                <form className={classes.form} onSubmit={form.handleSubmit(handleRegisterSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InputField form={form} name="firstName" label="Họ *" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputField form={form} name="lastName" label="Tên *" />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField form={form} name="email" label="Email *" />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordField form={form} name="password" label="Mật khẩu *" />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordField
                                form={form}
                                name="retypePassword"
                                label="Please enter password again *"
                            />
                        </Grid>
                    </Grid>
                    <ButtonField
                        classNameButton={classes.submit}
                        text="Register"
                        disabled={isSubmitting}
                    />
                </form>
            </div>
        </Container>
    )
}
