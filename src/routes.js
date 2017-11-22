import React from 'react';
import { Route, Switch } from 'react-router';

import Home from './pages/Home';
import Lost from './pages/Lost';
import RandomQuote from './pages/RandomQuote';
import LocalWeather from './pages/LocalWeather';

export default class Routes extends React.Component
{
    render()
    {
        return (
            <div className='container' style={{ padding: 0 }}>
                <Switch>
                    <Route exact path='/' component={ Home }/>
                    <Route exact path='/projects/RandomQuote' component={ RandomQuote }/>
                    <Route exact path='/projects/LocalWeather' component={ LocalWeather }/>
                    <Route path='*' component={ Lost }/>
                </Switch>
            </div>
        );
    }
}
