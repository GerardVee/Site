import React from 'react';
import styled from 'styled-components';

import Text from '../atoms/Text';
import Title from '../atoms/Title';
import Button from '../atoms/Button';
import { media } from '../_helpers/media';

const Projects = ({ content, images, className }) => (
    <div className={ `row ${ className }` }>
        <div className='col-sm-12 center'>
            <div className='row'>
                { content.find(item => item.type === 'projects-list').content.map((item, index) => [
                    <div className='col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-5 col-lg-offset-3 col-lg-3' key={ `projects-${ index }` }>
                        <Title bold shade='#524E4D' size='1.8x'>{ item.title }</Title>
                        <Text shade='#524E4D' size='0.9x'>{ item.description }</Text>
                        <img className='hidden-md hidden-lg' src={ images.find(img => img.name === item.title).location } height="50%"/>
                        <Button bold fill='#FADA5E' shade='white' stroke='none' to={ item.url }>Visit</Button>
                    </div>,
                    <div className='col-sm-12 col-lg-2 col-md-3 center hidden-sm' key={ `projects-picture-${ index }` }>
                        <img src={ images.find(img => img.name === item.title).location } width="100%"/>
                    </div> ])
                }
            </div>
        </div>
    </div>
);

export default styled(Projects)`
    >div>div>div>h1 {
        padding-bottom: 1em;
    }
    >div>div>div>p {
        ${ media.small`
            width: 100%;
        ` };
        ${ media.medium`
            width: 50%;
        ` };
        padding-bottom: 1em;
    }
    >div>div>div {
        padding-top: 3em;
        padding-bottom: 2em;
        ${ media.small`
            text-align: center;
        ` };
        ${ media.medium`
            text-align: left;
        ` };
    }
    >div>div>.col-md-5 {
        ${ media.medium`
            padding-top: 3em;
        ` };
        ${ media.large`
            padding-top: 6em;
        ` };
    }
    padding-top: 2em;
    padding-bottom: 1em;
`;
