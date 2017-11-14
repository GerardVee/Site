import React from 'react';
import styled from 'styled-components';

import ContactModal from './ContactModal';
import Text from '../atoms/Text';
import Title from '../atoms/Title';
import Button from '../atoms/Button';

class ContactInfo extends React.Component
{
    state = { showModal: false };

    render()
    {
        const { showModal } = this.state;
        const { content, className } = this.props;
        return (
            <div className={ `row ${ className }` }>
                { content.filter(item => item.type === 'contact').map((item) => [
                    <div className='col-sm-12 center' key={ `title-${ item.type }` }>
                        <Title bold shade='white' size='2.5x'>{ item.title }</Title>
                    </div>,
                    <div className='col-sm-12 center' key={ `body-${ item.type }` }>
                        <Text shade='white' size='1.8x'>{ item.body }</Text>
                    </div>,
                    <div className='col-sm-12 center' key={ `button-${ item.type }` }>
                        <Button bold fill='none' shade='white' stroke='white' onClick={ () => this.setState({ showModal: true })}>Start Now</Button>
                        <ContactModal content={ content } isOpen={ showModal } onRequestClose={ () => this.setState({ showModal: false }) } overlayClassName='modal-overlay'/>
                    </div> ])
                }
            </div>
        );
    }
}

export default styled(ContactInfo)`
    padding-top: 2em;
    padding-bottom: 5em;
    >div>h1 {
        padding-bottom: 1em;
    }
    >div>p {
        padding-top: 1em;
        padding-bottom: 2em;
    }
`;
