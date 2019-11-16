import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import * as isoCountryList from 'countries-list';
import CountryBarChart from './CountryBarChart';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'baseline',
        padding: '1rem 0'
    },
    toolbarSelect: {
        width: '30%',
        marginLeft: '2rem'
    }
})
)
export default function CountryCharts(props) {
    const classes = useStyles();
    const [selectedContinent, setSelectedContinent] = useState('AS')
    const handleContinentSelection = (event) => {
        setSelectedContinent(event.target.value)
    }

    return (
        <>
            <div className={classes.toolbar}>
                <Typography component="p" color="primary">Select Continent</Typography>
                <Select className={classes.toolbarSelect}
                    value={selectedContinent}
                    onChange={handleContinentSelection}
                >
                    {Object.keys(isoCountryList.continents)
                        // Remove Antarctica from Continent List Selection as I found there are no scores stored for Antarctica
                        .filter(continent => continent !== 'AN')
                        .map(continent => {
                            return (
                                < MenuItem key={continent} value={continent} > {isoCountryList.continents[continent]}</MenuItem>
                            )
                        })}
                </Select>
            </div>
            <CountryBarChart continent={selectedContinent} people={props.people} />
        </>
    )
}