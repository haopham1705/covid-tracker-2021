import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: `${theme.spacing(3)}px 0`,
        minWidth: 120,
    },
}));

export default function CountrySelector({ countries, handleOnChange, value }) {
    const classes = useStyles();
    const {t} = useTranslation()

    return (
        <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor='country-selector'>
                {t('content.country')}
            </InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector',
                }}
            >
                {countries.map(({ Country, ISO2 }) => (
                    <option key={ISO2} value={ISO2.toLowerCase()}>
                        {Country}
                    </option>
                ))}
            </NativeSelect>
            <FormHelperText>{t('content.select_country')}</FormHelperText>
        </FormControl>
    );
}

CountrySelector.defaultProps = {
    countries: [],
};
