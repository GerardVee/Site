import React from 'react';

export default class extends React.Component
{
    componentDidMount()
    {
        const { children: title } = this.props;
        document.title = Array.isArray(title) ? title.join('') : title;
    }

    componentDidUpdate()
    {
        const { children: title } = this.props;
        document.title = Array.isArray(title) ? title.join('') : title;
    }

    render()
    {
        return null;
    }
}
