import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ContactInfo from '../molecules/ContactInfo';

class Contact extends React.Component
{
    render()
    {
        const { content, className } = this.props;
        return (
            <div className={ `container ${ className }` } id='contact'>
                { content && <ContactInfo content={ content }/> }
            </div>
        );
    }
}

const mapStateToProps = ({ content }) => ({ content });

export default connect(mapStateToProps)(styled(Contact)`
    background: #FADA5E;
    padding: 0;
    margin-top: 0;
`);
