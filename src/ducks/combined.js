import { combineReducers } from 'redux';

import { ContentReducer } from './content';
import { ImagesReducer } from './images'
import { WeatherReducer } from './weather'

export default combineReducers({ content: ContentReducer, images: ImagesReducer, weather: WeatherReducer });
