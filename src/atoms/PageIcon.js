import React from 'react';

export default class extends React.Component
{
    componentDidMount()
    {
        const { children: iconUrl } = this.props;
        let icon = document.querySelector('link[rel="icon"]');
        icon.href = iconUrl;
    }

    componentDidUpdate()
    {
        const { children: iconUrl } = this.props;
        let icon = document.querySelector('link[rel="icon"]');
        icon.href = iconUrl;
    }

    componentWillUnmount()
    {
        let icon = document.querySelector('link[rel="icon"]');
        icon.href = '/icons/icon.png';
    }

    render()
    {
        return null;
    }
}
