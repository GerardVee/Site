import React from 'react';
import styled from 'styled-components';

import objectIsEmpty from '../_helpers/emptyObject';
// quoteapp instead; import WeatherInfo from '../molecules/WeatherInfo';

class QuoteApp extends React.Component
{
    render()
    {
        const { quote, className } = this.props;
        return (
            <div className={ `container ${ className }` }>
                { !(objectIsEmpty(quote)) && JSON.stringify(quote) }
                Tap 'T' for nexT; hold to Tweet.
            </div>
        );
    }
}

export default styled(QuoteApp)`
    padding: 0;
    margin-top: 0;
`;
