import React from 'react'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { createMount } from '@material-ui/core/test-utils';
import { PieChart, Sector } from 'recharts';
import GenderChart from './GenderChart';

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
]
configure({ adapter: new Adapter() });
describe('GenderChart Component', () => {
    let mount;
    let component;

    beforeEach(() => {
        mount = createMount();
        component = mount(<GenderChart people={mockData} />);
    })

    afterEach(() => {
        mount.cleanUp();
    })

    it('Should display correct number of rows in table', () => {
        expect(component.find(PieChart)).toHaveLength(1);
    })

    it('Should display correct percentage of male and female score', () => {
        const pieSector = component.find(PieChart).find(Sector)
        const totalScore = 1234 + 5678
        const maleScorePercent = 1234 / totalScore;
        const femaleScorePercent = 5678 / totalScore;
        expect(pieSector.at(0).prop("percent")).toEqual(maleScorePercent)
        expect(pieSector.at(1).prop("percent")).toEqual(femaleScorePercent)
    })

});