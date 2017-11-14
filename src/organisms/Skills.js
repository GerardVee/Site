import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Expertise from '../molecules/Expertise';

class Skills extends React.Component
{
    render()
    {
        const { content, className } = this.props;
        return (
            <div className={ `container ${ className }` } id='skills'>
                { content && <Expertise content={ content }/> }
            </div>
        );
    }
}

const mapStateToProps = ({ content }) => ({ content });

export default connect(mapStateToProps)(styled(Skills)`
    padding: 0;
    margin-top: 0;
`);
