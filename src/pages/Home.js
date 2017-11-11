import React from 'react';
import { connect } from 'react-redux';

import Button from '../atoms/Button';
import PageTitle from '../atoms/PageTitle';

class Home extends React.Component
{
    render()
    {
        return (
            <div className='col-sm'>
                <PageTitle>GerardVee</PageTitle>
                <Button bold fill='#FADA5E' shade='white' stroke='none'>Add</Button>
                <Button bold fill='none' shade='#FADA5E' stroke='#FADA5E'>Edit</Button>
                <Button bold fill='none' shade='#FADA5E' stroke='#FADA5E'>Swap</Button>
                <Button bold fill='none' shade='#9B30FF' stroke='#9B30FF'>Clear</Button>
                <Button bold fill='none' shade='#9B30FF' stroke='#9B30FF'>Remove</Button>
                <Button bold fill='#9B30FF' shade='white' stroke='none'>Delete</Button>
            </div>
        );
    }
}

export default connect()(Home);
