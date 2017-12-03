import React from 'react';

import PageTitle from '../atoms/PageTitle';
import WikiSearch from '../organisms/WikiSearch';

class WikiViewer extends React.Component
{
    render()
    {
        return (
            <div className='col-sm' style={{ padding: 0 }}>
                <PageTitle>WikiViewer</PageTitle>
                <WikiSearch/>
            </div>
        );
    }
}

export default WikiViewer;
