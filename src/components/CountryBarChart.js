import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title';
import * as isoCountryList from 'countries-list';

function getTotalScore(filterKey, filterValue, data) {
    return data
        .filter((d) => {
            return d[filterKey] === filterValue;
        })
        .reduce((acc, value) => {
            return acc + value.score;
        }, 0);
}

function getAverageScore(score, data) {
    const allScores = data.reduce((acc, value) => {
        return acc + value.score;
    }, 0);
    const averageScore = parseFloat(((score / allScores) * 100).toFixed(2));
    return averageScore;
}

export default function CountryBarChart(props) {
    const [people, setPeople] = useState([])

    useEffect(() => {
        // Step1: Get list of all countries (Filter by Continent)
        const countryList = props.people && props.people
            .filter(people => {
                return isoCountryList.countries[people.country].continent === props.continent
            })
            .reduce((countries, people) => {
                return countries.includes(people.country)
                    ? countries
                    : [...countries, people.country]
            }, [])
        // Step2: Prepare data with Total and AverageScore
        const chartData = props.people && countryList.map(country => {
            const totalScore = getTotalScore('country', country, props.people);
            const averageScore = getAverageScore(totalScore, props.people);
            return {
                country,
                countryName: isoCountryList.countries[country].name,
                totalScore,
                averageScore
            }
        })
        setPeople(chartData);
    }, [props.continent, props.people])

    return (
        <React.Fragment>
            <Title>Score statistics of {isoCountryList.continents[props.continent]}</Title>
            <ResponsiveContainer>
                <BarChart
                    data={people}
                    layout="vertical"
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 50,
                        left: 10,
                    }}
                >
                    <XAxis type="number">
                        <Label
                            offset={-20}
                            position="insideBottom"
                            style={{ fontSize: 20 }}
                        >Average Score
                            </Label>
                    </XAxis>
                    <YAxis type="category" dataKey='countryName' width={200} style={{ fontSize: 11 }}>
                        <Label
                            angle="-90"
                            position="insideLeft"
                            style={{ fontSize: 20 }}
                        >{`Countries of ${isoCountryList.continents[props.continent]}`}
                        </Label>
                    </YAxis>
                    <Bar type="monotone" dataKey="averageScore" fill="#556CD6" />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment >
    );
}
