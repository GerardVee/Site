import 'isomorphic-fetch';

const RETRIEVE = 'site/images/RETRIEVE';
const RECEIVE = 'site/images/RECEIVE';

export function retrieveImages()
{
    return (dispatch) =>
    {
        if (process.env.agent === 'SERVER' || process.env.agent === 'TEST')
        {
            dispatch(getImages());
            return fetch(`http://localhost:${ process.env.PORT_ADDR }/images`).then((response) => response.json(), error => console.log('error: ', error)).then((images) =>
            {
                dispatch(receiveImages(images));
            });
        }
        else
        {
            dispatch(getImages());
            return fetch(`/images`).then((response) => response.json(), error => console.log('error: ', error)).then((images) =>
            {
                dispatch(receiveImages(images));
            });
        }
    };
}

export const ImagesReducer = (state = [], action = {}) =>
{
    switch (action.type)
    {
        case RETRIEVE:
            return state;
        case RECEIVE:
            return action.images;
    }
    return state;
};

const receiveImages = (images) => ({ type: RECEIVE, images });
const getImages = () => ({ type: RETRIEVE });
