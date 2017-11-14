import React from 'react';
import styled from 'styled-components';

import Text from '../atoms/Text';
import Title from '../atoms/Title';
import { media } from '../_helpers/media';

const Expertise = ({ content, className }) => (
    <div className={ `row ${ className }` }>
        { content.filter(item => item.type === 'skills').map((item) => [
            <div className='col-sm-12 center' key={ `title-${ item.type }` }>
                <Title bold shade='#524E4D' size='3x'>{ item.title }</Title>
            </div>,
            <div className='col-sm-12 center' key={ `body-${ item.type }` }>
                <Text bold shade='#524E4D' size='1.1x'>{ item.body }</Text>
            </div> ])
        }
        <div className='col-sm-12 center'>
            <div className='row'>
                { content.find(item => item.type === 'skills-list').content.map((item, index, contents) => (
                    <div className={ `col-sm-12 col-md-${ 12 / contents.length } col-lg-${ 12 / contents.length } center` } key={ `skills-${ index }` }>
                        <i className={ `fa fa-${ item.icon } fa-5x` }/>
                        <Title bold shade='#524E4D' size='1.4x'>{ item.title }</Title>
                        <Text shade='#524E4D' size='0.9x'>{ item.body }</Text>
                    </div>))
                }
            </div>
        </div>
    </div>
);

export default styled(Expertise)`
    >div>div {
        ${ media.small`
            padding-bottom: 4em;
        ` };
        ${ media.medium`
            padding-bottom: 0em;
        ` };
    }
    padding-top: 2em;
    >div>div>div {
        ${ media.small`
            padding-bottom: 1em;
        ` };
        ${ media.medium`
            padding-bottom: 8em;
        ` };
    }
    >div>div>div>i {
        padding-top: 1.2em;
        color: #FADA5E;
    }
    >div>div>div>p {
        width: 75%;
        margin: 0 auto;
        text-align: center;
        padding-top: 0.3em;
    }
    >div>div>div>h1 {
        padding-top: 0.2em;
    }
    >div>h1 {
        padding-bottom: 0.3em;
    }
`;
