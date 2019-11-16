import React from 'react';
import { configure, shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Adapter from 'enzyme-adapter-react-16'
import Title from './Title';

configure({ adapter: new Adapter() });

describe('Title Component', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Title>Mock title</Title>)
    })

    it('Should render one Typography Component', () => {
        const wrapper = component.find(Typography)
        expect(wrapper.length).toBe(1)
    })

    it('Should render correct title', () => {
        const wrapper = component.find(Typography)
        expect(wrapper.text()).toContain("Mock title")
    })
})