import React from 'react';
import styled from 'styled-components';

import Text from '../atoms/Text';
import Title from '../atoms/Title';
import Button from '../atoms/Button';

const InTouch = ({ content, className }) => (
    <div className={ `row ${ className }` }>
        { content.filter(item => item.type === 'footer').map((item) => [
            <div className='col-sm-12 center' key={ `title-${ item.type }` }>
                <Title bold shade='black' size='1.3x'>{ item.title }</Title>
            </div>,
            <div className='col-sm-12 col-md-offset-3 col-md-6 center' key={ `body-${ item.type }` }>
                { item.buttons.map((button) => (
                    <Button key={ `key-${ button.type }` } icon={ button.type } type='graphic' stretch fill='none' shade='black' stroke='black' href={ button.url }/>
                ))
                }
            </div>,
            <div className='col-sm-12 center' key={ `copyright-${ item.type }` }>
                <Text shade='black' size='0.8x'>{ item.copyright }</Text>
            </div> ])
        }
    </div>
);

export default styled(InTouch)`
    padding-top: 2em;
    padding-bottom: 1em;
    >div>h1 {
        padding-bottom: 1em;
    }
    >div>p {
        padding-top: 2em;
    }
`;
