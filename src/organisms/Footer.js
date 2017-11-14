import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import InTouch from '../molecules/InTouch';

class Footer extends React.Component
{
    render()
    {
        const { content, className } = this.props;
        return (
            <div className={ `container ${ className }` } id='footer'>
                { content && <InTouch content={ content }/> }
            </div>
        );
    }
}

const mapStateToProps = ({ content }) => ({ content });

export default connect(mapStateToProps)(styled(Footer)`
    padding: 0;
    margin-top: 0;
`);
