import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import objectIsEmpty from '../_helpers/emptyObject';
import WeatherInfo from '../molecules/WeatherInfo';

class WeatherApp extends React.Component
{
    render()
    {
        const { weather, className } = this.props;
        return (
            <div className={ `container ${ className }` }>
                { !(objectIsEmpty(weather)) && <WeatherInfo weather={ weather }/> }
            </div>
        );
    }
}

const mapStateToProps = ({ weather }) => ({ weather });

export default connect(mapStateToProps)(styled(WeatherApp)`
    padding: 0;
    margin-top: 0;
`);
