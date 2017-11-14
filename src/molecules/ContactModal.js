import 'isomorphic-fetch';
import React from 'react';
import styled, { keyframes, injectGlobal } from 'styled-components';
import ReactModal from 'react-modal';

import Text from '../atoms/Text';
import Title from '../atoms/Title';
import post from '../_helpers/post';
import Button from '../atoms/Button';
import { media } from '../_helpers/media';

const fadeBlack = keyframes`
    0% {
        background-color: rgba(0, 0, 0, 0);
    }
    100% {
        background-color: rgba(0, 0, 0, 0.98);
    }
`;

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

injectGlobal`
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        animation: 1s ${ fadeBlack } ease forwards;
    }
    .modal-overlay:focus {
        outline: none;
    }
`;

class ContactModal extends React.Component
{
    state = { name: '', email: '', phone: '', website: '', query: '' };

    clearState()
    {
        this.setState({ name: '', email: '', phone: '', website: '', query: '' });
    }

    input(event)
    {
        const { target: { name, value } } = event;
        this.setState({ [name]: value });
    }

    async postToServerToBeSentViaNodeMail()
    {
        const { onRequestClose } = this.props;
        const { name, email, phone, website, query } = this.state;
        if (name && email && query)
        {
            const send = await fetch('/contact', post({ name, email, website, phone: phone.replace(/\s/g, ''), query }));
            const sent = await send.json();
            if (sent)
            {
                onRequestClose();
                alert('Your message has been delivered!');
            }
            else
            {
                alert('Unfortunately your message could not be delieved. Please try again.');
            }
        }
        else
        {
            alert('Finish up your form.');
        }
    }

    render()
    {
        const { props } = this;
        const { onRequestClose, content } = this.props;
        const { name, email, phone, website, query } = this.state;
        return (
            <ReactModal { ...props }>
                <div className='col-sm center'>
                    {
                        content.filter(item => item.type === 'modal').map((item) => [
                            <div className='row' key={ `title-${ item.type }` }>
                                <div className='col-sm-12 center'>
                                    <Title bold shade='white' size='2x'>{ item.title }</Title>
                                </div>
                            </div>,
                            <div className='row' key={ `body-text-${ item.type }` }>
                                <div className='col-sm-12 col-md-offset-3 col-md-6 center'>
                                    <Text shade='white' size='0.9x'>{ item.body }</Text>
                                </div>
                            </div>])
                    }
                    <div className='row'>
                        <div className='col-sm-6 center'>
                            <input name='name' value={ name } onChange={ (e) => this.input(e) } placeholder='Name*' required/>
                        </div>
                        <div className='col-sm-6 center'>
                            <input name='email' value={ email } onChange={ (e) => this.input(e) } type='email' placeholder='Email*' required/>
                        </div>
                        <div className='col-sm-6 center'>
                            <input name='phone' value={ phone } onChange={ (e) => this.input(e) } placeholder='Phone Number'/>
                        </div>
                        <div className='col-sm-6 center'>
                            <input name='website' value={ website } onChange={ (e) => this.input(e) } placeholder='Website'/>
                        </div>
                        <div className='col-sm-12 center'>
                            <textarea name='query' value={ query } onChange={ (e) => this.input(e) } placeholder={ content.filter(item => item.type === 'modal')[0].query } required/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-offset-1 col-md-10 center'>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <Button bold fill='#9B30FF' shade='white' stroke='none' stretch onClick={ () => onRequestClose() }>Close</Button>
                                </div>
                                <div className='col-sm-4'>
                                    <Button bold fill='none' shade='#9B30FF' stroke='#9B30FF' stretch onClick={ () => this.clearState() }>Clear</Button>
                                </div>
                                <div className='col-sm-4'>
                                    <Button bold fill='#FADA5E' shade='white' stroke='none' stretch onClick={ () => this.postToServerToBeSentViaNodeMail() }>Submit</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 center'>
                            <Text shade='white'>* = Required</Text>
                        </div>
                    </div>
                </div>
            </ReactModal>
        );
    }
}

export default styled(ContactModal)`
    position: absolute;
    >div>div>div>input {
        width: 95%;
    }
    >div>div>div>input::placeholder {
        opacity: 0.8;   
    }
    >div>div>div>textarea {
        box-sizing: border-box;
        width: 97.5%;
        height: 5em;
        resize: none;
    }
    >div>div>div>textarea::placeholder {
        opacity: 0.8;
    }
    ${ media.small`
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        >div>div {
            padding-top: 0.8em;
            padding-bottom: 0.8em;
        }
        >div>div>div {
            padding-top: 1em;
        }
        >div>div>div>h1 {
            font-size: 1.5em;
        }
        >div>div>div>p {
            font-size: 0.6em;
        }
    ` };
    ${ media.medium`
        top: 10%;
        left: 15%;
        right: 15%;
        bottom: 10%;
        >div>div {
            padding-top: 0em;
            padding-bottom: 0em;
        }
        >div>div>div {
            padding-top: 3em;
        }
        >div>div>div>h1 {
            font-size: 2em;
        }
        >div>div>div>p {
            font-size: 0.9em;
        }
        >div>div>div>div>div>button {
            width: 10em;
        }
    ` };
    animation: 1s ${ fadeIn } ease forwards;    
`;
