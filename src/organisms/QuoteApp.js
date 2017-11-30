import React from 'react';
import styled from 'styled-components';

import objectIsEmpty from '../_helpers/emptyObject';
import Quoter from '../molecules/Quoter';

class QuoteApp extends React.Component
{
    render()
    {
        const { quote, className } = this.props;
        return (
            <div className={ `container ${ className }` }>
                { !(objectIsEmpty(quote)) && <Quoter quote={ quote }/> }
            </div>
        );
    }
}

export default styled(QuoteApp)`
    padding: 0;
    margin-top: 0;
`;
