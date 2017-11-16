import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Text from '../atoms/Text';
import Title from '../atoms/Title';
import Button from '../atoms/Button';
import PageIcon from '../atoms/PageIcon';
import PageTitle from '../atoms/PageTitle';
import { media } from '../_helpers/media';
import { retrieveGeoWeather } from '../ducks/weather';

class WeatherInfo extends React.Component
{
    state = { currentTemperature: 0, geoCalled: false };

    geoWeather()
    {
        if (navigator.geolocation && typeof navigator.geolocation.getCurrentPosition === 'function')
        {
            navigator.geolocation.getCurrentPosition(({ coords }) =>
            {
                this.props.getWeatherFromGeo(coords);
                this.setState({ geoCalled: true });
            });
        }
        else
        {
            alert('Geolocation is not supported by this browser!');
        }
    }

    rotateTemperature()
    {
        const { currentTemperature } = this.state;
        if (currentTemperature + 1 > 2)
        {
            this.setState({ currentTemperature: 0 });
        }
        else
        {
            this.setState({ currentTemperature: currentTemperature + 1 });
        }
    }

    render()
    {
        const { currentTemperature, geoCalled } = this.state;
        const { weather, className } = this.props;
        return (
            <div className={ `row ${ className }` }>
                <PageTitle>{ weather.description } - LocalWeather</PageTitle>
                <PageIcon>{ weather.icon }</PageIcon>
                <div className='col-sm-12 center'>
                    <Title bold shade='white' size='2.8x' size-md='4x'>Weather Forecast for { weather.city }</Title>
                </div>
                <div className='col-sm-offset-2 col-sm-8 col-md-offset-5 col-md-2 center'>
                    <img src={ weather.picture } width='80%'/>
                </div>
                <div className='col-sm-offset-3 col-sm-6 col-md-offset-5 col-md-2 center'>
                    <Text shade='white' size='1.5x' size-md='2x'>{ weather.description }</Text>
                </div>
                <div className='col-sm-offset-3 col-sm-6 col-md-offset-5 col-md-2 center'>
                    <Text shade='white' size='1x' size-md='1.5x' className='time'>{ weather.time }</Text>
                </div>
                <div className='col-sm-12 col-md-offset-2 col-md-8 center weather-infos'>
                    <div className='row'>
                        <div className='col-sm-4 center'>
                            <Text shade='white' size='1x'>{ weather.windSpeed } <img src={ weather.direction }/></Text>
                        </div>
                        <div className='col-sm-4 col-sm-first col-md-normal center'>
                            <Text shade='white' size='1x' onClick={ () => this.rotateTemperature() }>{ weather.temperature[currentTemperature] }</Text>
                        </div>
                        <div className='col-sm-4 center'>
                            <Text shade='white' size='1x'>{ Number(weather.cloudiness.slice(0, -1)).toFixed(1) }% cloudy</Text>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 center'>
                    { !geoCalled && <Button bold icon='map-pin' type='graphic' shade='white' fill='none' stroke='none' stretch onClick={ () => this.geoWeather() }/> }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getWeatherFromGeo: (coordinates) => dispatch(retrieveGeoWeather(coordinates))
});

export default connect(() => ({}), mapDispatchToProps)(styled(WeatherInfo)`
    ${ media.small`
        padding-top: 2em;
        >div>.time {
            padding-bottom: 2.5em;
        }
        >div>img {
            filter: brightness(200%);
            padding-top: 3em;
            padding-bottom: 3em;
        }
        >div>div>div>p>img {
            filter: brightness(200%);
            width: 10%;
        }
        >.weather-infos {
            padding-bottom: 2em;
        }
    ` };
    ${ media.medium`
        padding-top: 5em;
        >div>.time {
            padding-bottom: 3em;
        }
        >div>img {
            padding-top: 4em;
            padding-bottom: 4em;
        }
        >div>div>div>p>img {
            width: 5%;
        }
    ` };
`);
