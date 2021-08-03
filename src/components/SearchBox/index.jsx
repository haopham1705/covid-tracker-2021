import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import trackerApi from 'api/trackerApi'

function SearchBox(props) {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            const params = {
            } 
            const listCountries = await trackerApi.getCountryByName();
            setCountries(listCountries)
            console.log(listCountries)
        }
    },[])
    return (
        <>
            {/* <Autocomplete
                {...defaultProps}
                id="controlled-demo"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="controlled" margin="normal" />}
            /> */}
            
        </>
    );
}

export default SearchBox;