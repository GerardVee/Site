import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Projects from '../molecules/Projects';

class Portfolio extends React.Component
{
    render()
    {
        const { content, images, className } = this.props;
        return (
            <div className={ `container ${ className }` } id='portfolio'>
                { content && <Projects content={ content } images={ images }/> }
            </div>
        );
    }
}

const mapStateToProps = ({ content, images }) => ({ content, images });

export default connect(mapStateToProps)(styled(Portfolio)`
    padding: 0;
    margin-top: 0;
    >div {
        background: #eee;
    }
`);
