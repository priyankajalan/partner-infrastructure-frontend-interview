import React from 'react'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { createMount } from '@material-ui/core/test-utils';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CountryCharts from './CountryCharts';
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
]
configure({ adapter: new Adapter() });
describe('CountryCharts Component', () => {
    let mount;
    let component;

    beforeEach(() => {
        mount = createMount();
        component = mount(<CountryCharts people={mockData} />);
    })

    afterEach(() => {
        mount.cleanUp();
    })

    it('Should display correct components', () => {
        expect(component.find(Select)).toHaveLength(1);
        expect(component.find(CountryBarChart)).toHaveLength(1);
    })

    it('Should display correct number of rows in table', () => {
        const continentSelect = component.find(Select).find('[role="button"]');
        continentSelect.simulate('click')
        component.find(MenuItem).at(2).simulate('click')
        expect(continentSelect.text()).toContain("Europe");
    })

});