import React from 'react';

import PageTitle from '../atoms/PageTitle';
import QuoteApp from '../organisms/QuoteApp';

class RandomQuote extends React.Component
{
    state = { quote: '' };

    async componentDidMount()
    {
        const res = await fetch('/getquote');
        const quote = await res.json();
        this.setState({ quote });
    }

    render()
    {
        const { quote } = this.state;
        return (
            <div className='col-sm' style={{ padding: 0 }}>
                <PageTitle>RandomQuote</PageTitle>
                <QuoteApp quote={ quote }/>
            </div>
        );
    }
}

export default RandomQuote;
