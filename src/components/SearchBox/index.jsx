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
            <Autocomplete
                freeSolo
                id="search_country"
                disableClearable
                options={countries.map((country) => country.country_name)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search country"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
            
        </>
    );
}

export default SearchBox;