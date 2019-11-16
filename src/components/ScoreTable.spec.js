import React from 'react'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { createMount } from '@material-ui/core/test-utils';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import ScoreTable from './ScoreTable';

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
describe('ScoreTable Component', () => {
    let mount;
    let component;

    beforeEach(() => {
        mount = createMount();
        component = mount(<ScoreTable people={mockData} />);
    });

    afterEach(() => {
        mount.cleanUp();
    });

    it('Should display correct number of rows in table', () => {
        expect(component.find(TableBody).find(TableRow)).toHaveLength(2)
    })

    it('should display correct data in the table', () => {
        const FirstRow = component.find(TableRow).at(1).find("td")
        expect(FirstRow).toHaveLength(6)
        expect(FirstRow.at(0).text()).toContain("Mock Last Name One")
        expect(FirstRow.at(1).text()).toContain("Mock First Name One")
        expect(FirstRow.at(2).text()).toContain("Male")
        expect(FirstRow.at(3).text()).toContain("Mock City One")
        expect(FirstRow.at(4).text()).toContain("Indonesia")
        expect(FirstRow.at(5).text()).toContain(1234)
    });
});