import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

/*
 * defaults:
 *  colors = { shade: black, stroke: none }
 */

/*
    * = required
    OR = one or the other
    href: different app state link,
     OR
    to: same app state link,
     OR
    onClick: function to run on click,
    *shade: a predefined color (aka, light blue, dark blue, none (tranparent) etc.) or a completely new one such as '#FFFFFF' for text,
    *stroke: same as above, but for underline
     bold: should it be bold or not bold (default)?
     size: can be '2x' or '3x', etc to scale size, '1x' (default)
*/

class LText extends React.Component
{
    render()
    {
        const { className, children, onClick, to, href } = this.props;
        const _onClick = to ? () => this.props.history.push(to) : href ? () => window.location.href = href : onClick;
        const _className = className;
        return <p className={ _className } children={ children } onClick={ _onClick }/>;
    }
}

const Text = withRouter(LText);

export default styled(Text)`
    color: ${ props => props.shade === 'none' ? 'transparent' : props.shade || 'black' };
    ${props => (props.stroke && props.stroke !== 'none') ? ` 
    text-decoration: underline;
    text-decoration-color: ${ props.stroke };
    ` : '' };
    ${ props => props.bold ? 'font-weight: bold;' : '' };        
    ${ props => (props.size && props.size !== '1') ? ` 
    font-size: ${`${ Number(props.size.slice(0, -1)) * 1 }em`};` : 'font-size: 1em;' };
    ${ props => props.onClick ? `
        &:hover{
            cursor: pointer;
        }        
    ` : ''};
`;
