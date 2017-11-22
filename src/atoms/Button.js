import React from 'react';
import styled from 'styled-components';
import { shade, tint } from 'polished';
import { withRouter } from 'react-router-dom';

/*
 * defaults:
 *  colors = { fill: #001F3F, shade: white, stroke: black }
 */

/*
    * = required
    OR = one or the other
    *type: graphic (icon with text [if any] below) or  standard (default),
    *href: different app state link,
     OR
    *to: same app state link,
     OR
    *onClick: function to run on click,
    *icon: icon fa classname, to be added after the children, if 'none' is called, none is added,
    *fill: a predefined color (aka, light blue, dark blue, none (tranparent) etc.) or a completely new one such as '#FFFFFF'
    *shade: same as above but for text,
    *stroke: same as above, but for border-color
     stretch: should it stretch to fit, or should it be clipped in length (default)?
     bold: should it be bold or not bold (default)?
     focus: 'primary' (default) for bigger text, 'secondary' for smaller text
*/

class LButton extends React.Component
{
    render()
    {
        const { className, children, onClick, type, to, href, icon, disabled } = this.props;
        const _onClick = to ? () => this.props.history.push(to) : href ? () => window.location.href = href : onClick;
        if (icon && icon !== 'none')
        {
            if (type === 'graphic')
            {
                return (
                    <button className={ className } onClick={ _onClick } type={ type } disabled={ disabled }>
                        <i className={ `fa fa-${ icon } fa-2x` }></i><br/>
                        { children }
                    </button>
                );
            }
            else
            {
                return (
                    <button className={ className } onClick={ _onClick } type={ type } disabled={ disabled }>
                        <i className={ `fa fa-${ icon }` }></i>{ ' ' + children }
                    </button>
                );
            }
        }
        return <button className={ className } children={ children } onClick={ _onClick } type={ type } disabled={ disabled }/>;
    }
}

const Button = withRouter(LButton);

export default styled(Button)`
    ${ props => props.stretch ? '' : 'width: 10em;' };
    ${ props => props.focus === 'secondary' ? 'font-size: 0.8em;' : '' };
    ${ props => props.icon ? `
        text-decoration: none;
        color: blue;
        cursor: pointer;
    ` : '' };
    background-color: ${ props => props.fill === 'none' ? 'transparent' : props.fill || '#001F3F' };
    color: ${ props => props.shade === 'none' ? 'transparent' : props.shade || 'white' };
    border: solid;
    ${ (props) => props.bold ? 'font-weight: bold;' : '' };
    border-radius: 0.3em;
    border-color: ${ props => props.stroke === 'none' ? 'transparent' : props.stroke || 'black' };
    &:hover{
        background-color: ${ props => `${ props.fill === 'none' ? 'transparent' : tint(0.75, props.fill || '#001F3F') }`};
    }
    &:focus{
        background-color: ${ props => `${ props.fill === 'none' ? 'transparent' : shade(0.2, props.fill || '#001F3F') }`};
    }
`;
