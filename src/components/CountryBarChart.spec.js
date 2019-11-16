import React from 'react'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { createMount } from '@material-ui/core/test-utils';
import { BarChart } from 'recharts';
import CountryBarChart from './CountryBarChart';

const mockData = [
    {
        "id": "mock-id1",
        "first_name": "Mock First Name One",
        "last_name": "Mock Last Name One",
        "email": "mockone@email.com",
        "gender": "Male",
        "city": "Mock City One",
        "country": "ID",
        "score": 1234,
        "created_at": "2017-01-13T04:17:49Z"
    },
    {
        "id": "mock-id2",
        "first_name": "Mock First Name Two",
        "last_name": "Mock Last Name Two",
        "email": "mocktwo@email.com",
        "gender": "Female",
        "city": "Mock City Two",
        "country": "ID",
        "score": 5678,
        "created_at": "2017-01-13T04:17:49Z"
    },
    {
        "id": "mock-id2",
        "first_name": "Mock First Name Two",
        "last_name": "Mock Last Name Two",
        "email": "mocktwo@email.com",
        "gender": "Female",
        "city": "Mock City Two",
        "country": "IN",
        "score": 1234,
        "created_at": "2017-01-13T04:17:49Z"
    },
]
configure({ adapter: new Adapter() });
describe('CountryBarChart Component', () => {
    let mount;
    let component;

    beforeEach(() => {
        mount = createMount();
        component = mount(<CountryBarChart continent="AS" people={mockData} />);
    })

    afterEach(() => {
        mount.cleanUp();
    })

    it('Should display correct components', () => {
        expect(component.find(BarChart)).toHaveLength(1);

    })

    it('Should calculate correct average score and pass to BarChart prop', () => {
        const barChartData = [{
            country: 'ID',
            countryName: 'Indonesia',
            totalScore: 6912,
            averageScore: 84.85
        }, {
            country: 'IN',
            countryName: 'India',
            totalScore: 1234,
            averageScore: 15.15
        }]
        expect(component.find(BarChart).prop("data")).toEqual(barChartData);
    })

});