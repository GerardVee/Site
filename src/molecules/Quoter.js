import React from 'react';
import styled from 'styled-components';

import Text from '../atoms/Text';
import Title from '../atoms/Title';
import PageTitle from '../atoms/PageTitle';
import { media } from '../_helpers/media';

const inContext = (author, quote) =>
{
    const limiters = `"" - ${ author }.`.length;
    const withTweetLimit = 140 - limiters;
    if (quote.length <= withTweetLimit)
    {
        return quote;
    }
    else
    {
        return quote.substr(0, withTweetLimit - 3) + '...';
    }
};

const colorSelection = [ '#92FFAF', '#3DA9C2', '#FFF29C', '#FFB26B', '#FF639F', '#00FFF5', '#8FF5D2', '#C089F8', '#B61AAE', '#8FF5D2' ];
const colorLength = colorSelection.length;

class Quoter extends React.Component
{
    state = { previousColor: '#6BF1DE', colorIndex: 0, currentQuote: '' };
    timer = null;

    clearEvents()
    {
        document.onmouseup = () => {};
        document.ontouchend = () => {};
    }

    async nextQuote()
    {
        clearTimeout(this.timer);
        const res = await fetch('/getquote');
        const quote = await res.json();
        this.setQuote(quote);
        this.shiftColors();
    }

    openTweet(quote, author)
    {
        window.open(`https://twitter.com/intent/tweet?text=${ encodeURIComponent(`"${ quote }" - ${ author.trim() }.`) }`, null, 'height=400,width=400,status=yes,toolbar=no,menubar=no,location=no');
    }

    setQuote(currentQuote)
    {
        this.setState({ currentQuote });
    }

    shiftColors()
    {
        const { colorIndex } = this.state;
        this.setState({ previousColor: colorSelection[colorIndex] });
        if (colorIndex < colorLength)
        {
            this.setState({ colorIndex: colorIndex + 1 });
        }
        else
        {
            this.setState({ colorIndex: 0 });
        }
    }

    tweetOut()
    {
        this.timer = setTimeout(() =>
        {
            const { quote: q } = this.props;
            const { currentQuote } = this.state;
            const { quoteText, quoteAuthor } = currentQuote || q;
            const author = quoteAuthor || 'Anonymous';
            const text = inContext(author.trim(), quoteText.trim());
            if (quoteText === '' || !quoteText)
            {
                alert('The quote is erring!');
                return;
            }
            this.openTweet(text, author);
            this.clearEvents();
        }, 300);
    }

    render()
    {
        const { quote: q, className } = this.props;
        const { currentQuote, previousColor: color } = this.state;
        const { quoteText: quote, quoteAuthor: author } = currentQuote || q;
        return (
            <div className={ `row ${ className }` }>
                <PageTitle>RandomQuote</PageTitle>
                <div className='col-sm-12 col-lg-offset-3 col-lg-6 center'>
                    <Title size-md='4x' size='2x' stroke={ color }>Random Quotes</Title>
                </div>
                <div className='col-sm-12 col-lg-offset-4 col-lg-4 center'>
                    <blockquote cite={ author.trim() || 'Anonymous' } style={{ background: color }}
                        onMouseDown={ () => this.tweetOut() } onMouseUp={ () => this.nextQuote() } onTouchStart={ () => this.tweetOut() } onTouchEnd={ () => this.nextQuote() }>
                        { quote.trim() }
                    </blockquote>
                </div>
                <div className='col-sm-12 col-lg-offset-4 col-lg-4 center'>
                    <Text size-md='1.2x' size='1x'>Tap the modal for next quote; hold to tweet.</Text>
                </div>
            </div>
        );
    }
}

export default styled(Quoter)`
    ${ media.small`
        padding-top: 7em;
    ` };
    ${ media.medium`
        padding-top: 12em;    
    ` };
    >div>h1 {
        padding-bottom: 1.2em;
    }
    >div>blockquote {
        padding-top: 2em;
    }
    >div>blockquote:after {
        padding-top: 2em;
    }
    >div>p {
        padding-top: 4em;
    }
`;
