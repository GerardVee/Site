import React from 'react';
import { connect } from 'react-redux';
import { injectGlobal } from 'styled-components';

import PageTitle from '../atoms/PageTitle';
import WeatherApp from '../organisms/WeatherApp';
import { retrieveIPWeather } from '../ducks/weather';

class LocalWeather extends React.Component
{
    componentDidMount()
    {
        injectGlobal`
            body {
                background-color: #a6cbff;
            }
        `;
        this.props.getWeatherFromIP();
    }

    componentWillUnmount()
    {
        injectGlobal`
            body {
                background-color: white;
            }
        `;
    }

    render()
    {
        return (
            <div className='col-sm' style={{ padding: 0 }}>
                <PageTitle>LocalWeather</PageTitle>
                <WeatherApp/>
            </div>
        );
    }
}

const mapStateToProps = ({ weather }) => ({ weather });

const mapDispatchToProps = (dispatch) => ({
    getWeatherFromIP: () => dispatch(retrieveIPWeather())
});

export default connect(mapStateToProps, mapDispatchToProps)(LocalWeather);
