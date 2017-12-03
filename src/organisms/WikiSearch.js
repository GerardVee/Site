import React from 'react';
import styled from 'styled-components';

import post from '../_helpers/post';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import { media } from '../_helpers/media';
import Autosuggest from '../atoms/Autosuggest';

class WikiSearch extends React.Component
{
    state = { value: '', suggestions: [], isLoading: false, error: false };
    async loadSuggestions(value)
    {
        this.setState({ isLoading: true });
        const res = await fetch('/wiki', post({ query: value }));
        const wikiData = await res.json();
        const suggestions = wikiData.query.search;
        if (suggestions.length <= 0)
        {
            return this.setState({ isLoading: false, suggestions, error: true });
        }
        this.setState({ isLoading: false, suggestions, error: false });
    }
    onChange(event, { newValue })
    {
        this.setState({ value: newValue });
    }

    onSuggestionsClearRequested()
    {
        this.setState({ suggestions: [] });
    }

    async onSuggestionsFetchRequested({ value })
    {
        this.loadSuggestions(value);
    }

    render()
    {
        const { className } = this.props;
        const { value, suggestions, error, isLoading } = this.state;
        return (
            <div className={ `container ${ className }` }>
                <div className='row'>
                    <div className='col-sm-12 center'>
                        <Title size-lg='6x' size='3.5x'>WikiViewer</Title>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 center'>
                        <Text size='1x'>Search Wikipedia</Text>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <Autosuggest value={ value } suggestions={ suggestions } onSuggestionsClearRequested={ () => this.onSuggestionsClearRequested() }
                            onSuggestionsFetchRequested={ (value) => this.onSuggestionsFetchRequested(value) } onChange={ (e, change) => this.onChange(e, change) }/>
                    </div>
                </div>
                { isLoading &&
                    <div className='row'>
                        <div className='col-sm-12 center'>
                            <i className='fa fa-circle-o-notch fa-spin fa-2x fa-fw'/>
                        </div>
                    </div>
                }
                { error &&
                    <div className='row'>
                        <div className='col-sm-12 center'>
                            <p className='no-results'>No Results</p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default styled(WikiSearch)`
    padding: 0;
    >div>div>h1 {
        padding-top: 2em;
        padding-bottom: 0.3em;
    }
    >div>div>i {
        margin-top: 1em;
    }
    >div>div>.no-results {
        color: red;
        padding-top: 1em;
        font-size: 2.3em;
    }
    ${ media.small`
        >div>div>p {
            padding-bottom: 1.8em;
        }
    ` };
    ${ media.medium`
        >div>div>p {
            padding-bottom: 3em;
        }
    ` };
`;
