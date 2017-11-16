import objectIsEmpty from './emptyObject';
import weatherIcon from './weatherIcon';
import direction from './directionFromDegree';
import { local } from './time';

export default ({ currently: current }) =>
{
    if (!(current) || objectIsEmpty(current))
    {
        return {};
    }
    return (
        {
            category: current.summary,
            description: current.summary,
            icon: weatherIcon(current.icon, 'png'),
            picture: weatherIcon(current.icon, 'svg'),
            direction: weatherIcon(direction(Number(current.windBearing)), 'svg'),
            temperature:
            [
                `${ Math.round(Number(current.temperature)) }°F`,
                `${ Math.round((Number(current.temperature) - 32) * (5 / 9)) }°C`,
                `${ Math.round((Number(current.temperature) + 459.67) * (5 / 9)) }K`
            ],
            pressure: `${ Number(current.pressure) }hPa`,
            humidity: `${ Number(current.humidity * 100) }%`,
            windSpeed: `${ Number(current.windSpeed) }mph`,
            windDirection: direction(Number(current.windBearing)),
            cloudiness: `${ Number(current.cloudCover * 100) }%`,
            time: local(new Date(Number(current.time) * 1000))
        }
    );
};
