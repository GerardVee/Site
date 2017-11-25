import React from 'react';

// import Text from '../atoms/Text';
import Title from '../atoms/Title';
// import Button from '../atoms/Button';
import PageTitle from '../atoms/PageTitle';

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

const tweetBase = 'https://twitter.com/intent/tweet?text=';
const windowSettings = 'height=400,width=400,status=yes,toolbar=no,menubar=no,location=no';

class Quoter extends React.Component
{
    state = { currentQuote: '' };
    timer = null;
    tweetOut()
    {
        this.timer = setTimeout(() =>
        {
            const { quote: q } = this.props;
            const { currentQuote } = this.state;
            const { quoteText, quoteAuthor, error } = currentQuote || q;
            if (quoteText === '' || !quoteText || error)
            {
                alert('The quote is erring!');
                return;
            }
            const author = quoteAuthor || 'Anonymous';
            const text = inContext(author.trim(), quoteText.trim());
            window.open(tweetBase + encodeURIComponent(`"${ text }" - ${ author.trim() }.`), null, windowSettings);

            document.onmouseup = () => {};
            document.ontouchend = () => {};
        }, 300);
    }

    async nextQuote()
    {
        clearTimeout(this.timer);
        const res = await fetch('/getquote');
        const currentQuote = await res.json();
        this.setState({ currentQuote });
    }

    render()
    {
        const { quote: q, className } = this.props;
        const { currentQuote } = this.state;
        const { quoteText: quote, quoteAuthor: author } = currentQuote || q;
        return (
            <div className={ `row ${ className }` }>
                <PageTitle>RandomQuote</PageTitle>
                <div onMouseDown={ () => this.tweetOut() } onMouseUp={ () => this.nextQuote() } onTouchStart={ () => this.tweetOut() } onTouchEnd={ () => this.nextQuote() }>
                    <Title>{ `"${ quote.trim() }"` }</Title>
                    <p>{ `- ${ author.trim() || 'Anonymous' }` }</p>
                </div>
            </div>
        );
    }
}

export default Quoter;
