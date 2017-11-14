import 'isomorphic-fetch';

const RETRIEVE = 'site/content/RETRIEVE';
const RECEIVE = 'site/content/RECEIVE';

export function retrieveContent()
{
    return (dispatch) =>
    {
        if (process.env.agent === 'SERVER' || process.env.agent === 'TEST')
        {
            dispatch(getContent());
            return fetch(`http://localhost:${ process.env.PORT_ADDR }/content`).then((response) => response.json(), error => console.log('error: ', error)).then((content) =>
            {
                dispatch(receiveContent(content));
            });
        }
        else
        {
            dispatch(getContent());
            return fetch(`/content`).then((response) => response.json(), error => console.log('error: ', error)).then((content) =>
            {
                dispatch(receiveContent(content));
            });
        }
    };
}

export const ContentReducer = (state = [], action = {}) =>
{
    switch (action.type)
    {
        case RETRIEVE:
            return state;
        case RECEIVE:
            return action.content;
    }
    return state;
};

const receiveContent = (content) => ({ type: RECEIVE, content });
const getContent = () => ({ type: RETRIEVE });
