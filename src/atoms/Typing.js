import React from 'react';
import Type from 'react-type';

/*
 * Still complains about className differences due to server not rendering
 */
export default class extends React.Component
{
    render()
    {
        const { props } = this;
        if (process.env.agent === 'BROWSER')
        {
            return (
                <Type { ...props }/>
            );
        }
        return (
            <span className={ props.className }/>
        );
    }
}
