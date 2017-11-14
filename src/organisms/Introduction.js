import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from '../molecules/Header';

class Introduction extends React.Component
{
    render()
    {
        const { content, className } = this.props;
        return (
            <div className={ `container ${ className }` }>
                { content && <Header content={ content }/> }
            </div>
        );
    }
}

const mapStateToProps = ({ content, images }) => ({ content, images });

export default connect(mapStateToProps)(styled(Introduction)`
    padding: 0;
    margin-top: 0;
    >div {
        background: ${ props => props.images ? `url(${ props.images.filter(picture => picture.name === 'header')[0].location })` : 'grey' } no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
`);
