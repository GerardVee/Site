import React from 'react';
import styled from 'styled-components';

import Text from '../atoms/Text';
import Title from '../atoms/Title';
import Button from '../atoms/Button';
import PageTitle from '../atoms/PageTitle';

class Lost extends React.Component
{
    render()
    {
        const { className } = this.props;
        return (
            <div className={ `col-sm ${ className }` } style={{ padding: 0 }}>
                <PageTitle>404</PageTitle>
                <div className='row'>
                    <div className='col-sm-12 center'>
                        <Title bold shade='#FADA5E' size='6x'>404 Lost :(</Title>
                    </div>
                    <div className='col-sm-offset-3 col-sm-6 center'>
                        <Text shade='black' size='2x'>You seem to have stumbled upon a broken link. Maybe you were looking for one of my projects?</Text>
                    </div>
                    <div className='col-sm-offset-3 col-sm-6 center'>
                        <Text shade='black' size='2x'>If so, they are currently under migration, and I hope to have them live soon!</Text>
                    </div>
                    <div className='col-sm-12 center'>
                        <Button bold icon='home' type='graphic' shade='white' fill='#FADA5E' stroke='none' to='/' stretch>Take me back home</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default styled(Lost)`
    >div>* {
        padding-top: 2em;
        padding-bottom: 3em;
    }
`;
