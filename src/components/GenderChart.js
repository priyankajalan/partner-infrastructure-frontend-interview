import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import Title from '../Title';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}% ${payload.label.toUpperCase()}`}
        </text>
    );
};

export default function GenderChart(props) {
    const [scoreChart, setScoreChart] = useState([])

    const totalScore = (gender, people) => {
        return people
            .filter(person => person.gender === gender)
            .reduce((accumulator, person) => person.score ? accumulator + person.score : accumulator, 0)
    }

    useEffect(() => {
        props.people && setScoreChart([
            { label: 'male', value: totalScore('Male', props.people) },
            { label: 'female', value: totalScore('Female', props.people) }
        ])
    }, [props.people])


    return (
        <>
            <Title>Score Statistics grouped by gender</Title>
            <PieChart width={500} height={500}>
                <Pie
                    data={scoreChart}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={200}
                    dataKey="value"
                >
                    <Cell fill="#FFBB28" />
                    <Cell fill="#00C49F" />
                </Pie>
            </PieChart>
        </>
    )
}