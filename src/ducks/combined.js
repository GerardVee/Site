import { combineReducers } from 'redux';

import { ContentReducer } from './content';
import { ImagesReducer } from './images'

export default combineReducers({ content: ContentReducer, images: ImagesReducer });
