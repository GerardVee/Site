import React from 'react';
import Autosuggest from 'react-autosuggest';
import styled, { injectGlobal } from 'styled-components';

injectGlobal`
    .react-autosuggest__suggestion
    {
        padding-top: 15px;
    }
    .react-autosuggest__suggestion:hover
    {
        cursor: pointer;
    }
`;

const styles =
{
    input:
    {
        width: '80%'
    },
    container:
    {
        width: '100%',
        position: 'relative',
        textAlign: 'center'
    },
    suggestionsContainerOpen:
    {
        position: 'absolute',
        marginBottom: '60px',
        textAlign: 'center',
        left: '6%',
        right: 0
    },
    suggestionsList:
    {
        width: '90%',
        margin: 0,
        padding: 0,
        listStyleType: 'none'
    },
    textField:
    {
        width: '100%'
    }
};

const link = (title) => `https://en.wikipedia.org/wiki/${ title.replace(/\s/g, '_') }`;
const strip = (html) =>
{
    let cont = document.createElement('DIV');
    cont.innerHTML = html;
    return cont.textContent || cont.innerText || '';
};

const Suggestion = styled(({ title, snippet, wordcount, className }) => (
    <span className={ className } onClick={ () => window.location.href = link(title) }>
        <h2>{ title }</h2><span>[{ wordcount }]</span> - { strip(snippet) }
    </span>
))`
    display: inline;
    >h2 {
        display: inline;
        color: #A8C0FC;
    }
    >span {
        display: inline;
        color: #BBBBBB;
    }
`;

const renderSuggestion = (props) => <Suggestion { ...props }/>;

const inputProps = (props) => ({
    placeholder: 'linux server',
    value: props.value,
    onChange: (e, value) => props.onChange(e, value)
});

export default ({ value, suggestions, onSuggestionsClearRequested, onSuggestionsFetchRequested, onChange }) => (
    <Autosuggest
        theme={{
            input: styles.input,
            container: styles.container,
            suggestionsContainerOpen: styles.suggestionsContainerOpen,
            suggestionsList: styles.suggestionsList,
            suggestion: 'react-autosuggest__suggestion'
        }}
        suggestions={ suggestions }
        onSuggestionsFetchRequested={ (value) => onSuggestionsFetchRequested(value) }
        onSuggestionsClearRequested={ (value) => onSuggestionsClearRequested() }
        getSuggestionValue={ (suggestion) => suggestion.name }
        renderSuggestion={ renderSuggestion }
        inputProps={ inputProps({ value, onChange }) }
    />
);
