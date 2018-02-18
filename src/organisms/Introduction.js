import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from '../molecules/Header';
import { media } from '../_helpers/media';

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
        -webkit-background-size: 100% auto!important;
        -moz-background-size: 100% auto!important;
        -o-background-size: 100% auto!important;
        background-size: 100% auto!important;
    }
    ${ media.small`
        >div {
            background: linear-gradient(90deg, #000000, #434343);
            /*background: linear-gradient(90deg, #2C3E50, #FD746C);
            background: #474B56 no-repeat center center fixed;*/
        }
    ` };
    ${ media.large`
        >div {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), ${ props => props.images ? `url(${ props.images.filter(picture => picture.name === 'header')[0].location })` : 'grey' };
        }
    ` };
`);
