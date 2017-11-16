import 'isomorphic-fetch';

import post from '../_helpers/post';
import toWeather from '../_helpers/toWeather';

const RETRIEVE = 'site/weather/RETRIEVE';
const RECEIVE = 'site/weather/RECEIVE';
const RETRIEVEGEO = 'site/weather/RETREIVEGEO';

export function retrieveIPWeather()
{
    return (dispatch) =>
    {
        dispatch(getIPWeather());
        fetch('https://freegeoip.net/json/').then((response) => response.json(), error => console.log('error: ', error)).then((location) =>
        {
            const { latitude, longitude, city } = location;
            const coordinates = { latitude: Number(latitude), longitude: Number(longitude) };
            getMyWeather(coordinates, dispatch, city);
        });
    };
}

export function retrieveGeoWeather({ longitude, latitude })
{
    return (dispatch) =>
    {
        dispatch(getGeoWeather());
        getMyWeather({ longitude, latitude }, dispatch);
    };
}

function getMyWeather({ latitude, longitude }, dispatch, city = null)
{
    const coordinates = { latitude: Number(latitude), longitude: Number(longitude) };
    if (process.env.agent === 'SERVER' || process.env.agent === 'TEST')
    {
        fetch(`http://localhost:${ process.env.PORT_ADDR }/getmyweather`, post(coordinates)).then((response) => response.json(), error => console.log('error: ', error)).then((weather) =>
        {
            if (city)
            {
                dispatch(receiveWeather({ ...toWeather(weather), city }));
            }
            else
            {
                dispatch(receiveWeather(toWeather(weather)));
            }
        });
    }
    else
    {
        fetch('/getmyweather', post(coordinates)).then((response) => response.json(), error => console.log('error: ', error)).then((weather) =>
        {
            if (city)
            {
                dispatch(receiveWeather({ ...toWeather(weather), city }));
            }
            else
            {
                dispatch(receiveWeather(toWeather(weather)));
            }
        });
    }
}

export const WeatherReducer = (state = {}, action = {}) =>
{
    switch (action.type)
    {
        case RETRIEVE:
            return state;
        case RECEIVE:
            return { ...action.weather, city: action.weather.city || state.city || null };
        case RETRIEVEGEO:
            return state;
    }
    return state;
};

const receiveWeather = (weather) => ({ type: RECEIVE, weather });
const getIPWeather = () => ({ type: RETRIEVE });
const getGeoWeather = () => ({ type: RETRIEVEGEO });
