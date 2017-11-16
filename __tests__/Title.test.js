import React from 'react';
import { shallow, mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import 'styled-components-test-utils/lib/jest';

import Title from '../src/atoms/Title';

test('Title has default styles', () =>
{
    const wrapper = shallow(<Title/>);
    expect(wrapper).toHaveStyleRule('color', 'black');
    expect(wrapper).not.toHaveStyleRule('font-weight', 'bold');
    expect(wrapper).not.toHaveStyleRule('text-decoration', 'underline');    
});

test('Title can have different colors', () =>
{
    const wrapper = shallow(<Title shade='green' stroke='yellow'/>);
    expect(wrapper).toHaveStyleRule('color', 'green');
    expect(wrapper).toHaveStyleRule('text-decoration-color', 'yellow');
});

test('Title can have no color', () =>
{
    const wrapper = shallow(<Title shade='none' stroke='none'/>);
    expect(wrapper).toHaveStyleRule('color', 'transparent');
    expect(wrapper).not.toHaveStyleRule('text-decoration', 'underline');    
});

test('Title can be bold or have different sized text', () =>
{
    const wrapper = shallow(<Title bold size='5x'/>);
    expect(wrapper).toHaveStyleRule('font-weight', 'bold');
    expect(wrapper).toHaveStyleRule('font-size', '5em');
});

test('Title preserves text', () =>
{
    const wrapper = shallow(<Title>Devil Child</Title>);
    expect(wrapper.childAt(0).text()).toEqual('Devil Child');
});

test('clicking a "to" Title causes change in routes', () =>
{
    const wrapper = mount(<StaticRouter location={ '/' } context={ {} }><Title to='rancid'/></StaticRouter>);
    expect(wrapper.props().context).toMatchObject({});
    wrapper.childAt(0).childAt(0).simulate('click');
    expect(wrapper.props().context.action).toBe('PUSH');
    expect(wrapper.props().context.url).toBe('rancid');
});

test('clicking a clickable Title causes an onClick event to be triggered', () =>
{
    let numbers = [ 5, 10, 15, 20 ];
    const wrapper = shallow(<Title onClick={ () => numbers = numbers.reduce((total, current) => total + current, 0) }/>);
    expect(numbers).toEqual([ 5, 10, 15, 20 ]);
    wrapper.simulate('click');
    expect(numbers).toEqual(50);
});

test('hovering over a clickable Title causes the cursor to become a pointer', () =>
{
    const wrapper = shallow(<Title onClick={ () => console.log('hi there') }/>);
    expect({ wrapper, modifier: '&:hover' }).toHaveStyleRule('cursor', 'pointer');
});