import React from 'react';
import styled from 'styled-components';
import scrollIntoView from 'scroll-into-view';

import Text from '../atoms/Text';
import Title from '../atoms/Title';
import Typing from '../atoms/Typing';
import Button from '../atoms/Button';
import { media } from '../_helpers/media';

const Header = ({ content, className, images }) => (
    <div className={ `row ${ className }` }>
        { content.filter(item => item.type === 'header').map((item) => [
            <div className='col-sm-12 center' key={ `title-${ item.type }` }>
                <Title shade='white' size='3x'>{ item.title }</Title>
            </div>,
            <div className='col-sm-12 center' key={ `body-${ item.type }` }>
                <Text shade='#FADA5E' size='2x'>{ item.body } { '\n' } <Typing hideCursorDelay={ 500 } defaultElement='' startTypingDelay={ 400 } cycle cycleType='erase' children={ content.find(item => item.type === 'cycle').snippets }/></Text>
            </div>,
            <div className='col-sm-12 center' key={ `button-${ item.type }` }>
                <Button icon='terminal' type='standard' bold fill='#FADA5E' shade='white' stroke='none' onClick={ () => scrollIntoView(document.getElementById('contact')) }>Hire Me</Button>
            </div>,
            <div className='col-sm-12 center learn-more' key={ `learn-more-${ item.type }` }>
                <Button icon='hand-o-down' type='graphic' bold fill='none' stroke='#FADA5E' shade='#FADA5E' stretch onClick={ () => scrollIntoView(document.getElementById('skills')) }>Learn more about me</Button>
            </div> ])
        }
    </div>
);

export default styled(Header)`
    padding-bottom: 5em;
    >div>h1 {
        padding-bottom: 3em;
    }
    &:last-child > .learn-more {
        padding-top: 12em;
    }
    >div>p {
        height: 3em;
        padding-top: 3em;
        padding-bottom: 2em;
    }
    >div>p>span {
        font-size: 1em!important;
    }
    ${ media.small`
        padding-top: 2em;
        >div>p {
            font-size: 1.4em;
            height: 3em;
        }
    ` }
    ${ media.medium`
        padding-top: 2em;
        >div>h1 {
            font-size: 4em;
        }
        >div>p {
            font-size: 2em;
            height: 2em;
        }
    ` }
`;
