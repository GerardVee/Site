import React from 'react';
import { shallow, mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import 'styled-components-test-utils/lib/jest';

import Text from '../src/atoms/Text';

test('Text has default styles', () =>
{
    const wrapper = shallow(<Text/>);
    expect(wrapper).toHaveStyleRule('color', 'black');
    expect(wrapper).not.toHaveStyleRule('font-weight', 'bold');
    expect(wrapper).not.toHaveStyleRule('text-decoration', 'underline');    
});

test('Text can have different colors', () =>
{
    const wrapper = shallow(<Text shade='pink' stroke='purple'/>);
    expect(wrapper).toHaveStyleRule('color', 'pink');
    expect(wrapper).toHaveStyleRule('text-decoration-color', 'purple');
});

test('Text can have no color', () =>
{
    const wrapper = shallow(<Text shade='none' stroke='none'/>);
    expect(wrapper).toHaveStyleRule('color', 'transparent');
    expect(wrapper).not.toHaveStyleRule('text-decoration', 'underline');    
});

test('Text can be bold or have different sized text', () =>
{
    const wrapper = shallow(<Text bold size='3x'/>);
    expect(wrapper).toHaveStyleRule('font-weight', 'bold');
    expect(wrapper).toHaveStyleRule('font-size', '3em');
});

test('Text preserves text', () =>
{
    const wrapper = shallow(<Text>Wonderful Women</Text>);
    expect(wrapper.childAt(0).text()).toEqual('Wonderful Women');
});

test('clicking a "to" Text causes change in routes', () =>
{
    const wrapper = mount(<StaticRouter location={ '/' } context={ {} }><Text to='nyada'/></StaticRouter>);
    expect(wrapper.props().context).toMatchObject({});
    wrapper.childAt(0).childAt(0).simulate('click');
    expect(wrapper.props().context.action).toBe('PUSH');
    expect(wrapper.props().context.url).toBe('nyada');
});

test('clicking a clickable Text causes an onClick event to be triggered', () =>
{
    let order =
    [
        { name: 'Sandy Shoes', price: 200, quantity: 2 },
        { name: 'Link Green Boots', price: 89, quantity: 1 },
        { name: 'Feather Fluffers', price: 49, quantity: 2 },
        { name: 'Shipping', price: 28 }
    ];
    const total = () =>
    {
        const beforeShipping = order.filter(item => item.name !== 'Total' && item.name !== 'Shipping').reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = order.find(item => item.name === 'Shipping');
        order.push({ name: 'Total', price: beforeShipping > 600 ? beforeShipping : beforeShipping + shipping.price });        
    };
    const wrapper = shallow(<Text onClick={ () => total() }/>);
    expect(order.find(item => item.name === 'Total')).toBeUndefined();
    wrapper.simulate('click');
    expect(order.find(item => item.name === 'Total').price).not.toEqual(200 * 2 + 89 + 49 * 2);
    expect(order.find(item => item.name === 'Total').price).toEqual(200 * 2 + 89 + 49 * 2 + 28);
});

test('hovering over a clickable Text causes the cursor to become a pointer', () =>
{
    const wrapper = shallow(<Text onClick={ () => console.log('bye there') }/>);
    expect({ wrapper, modifier: '&:hover' }).toHaveStyleRule('cursor', 'pointer');
});