import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './pages/Home';
import Lost from './pages/Lost';

export default class Routes extends React.Component
{
    render()
    {
        return (
            <div className='container' style={{ padding: 0 }}>
                <Switch>
                    <Route exact path='/' component={ Home }/>
                    <Route path='*' component={ Lost }/>
                </Switch>
            </div>
        );
    }
}
