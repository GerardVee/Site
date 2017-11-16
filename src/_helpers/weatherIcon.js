/*
 * possible due to http://www.danvierich.de/weather/, thanks :)
 */
export default (status, type) =>
{
    const path = '/icons/weather/';
    switch (status)
    {
        case 'clear-day':
            return `${ path }sw-01.${ type }`;
        case 'clear-night':
            return `${ path }sw-02.${ type }`;
        case 'rain':
            return `${ path }sw-21.${ type }`;
        case 'snow':
        case 'sleet':
            return `${ path }sw-24.${ type }`;
        case 'wind':
            return `${ path }sw-30.${ type }`;
        case 'fog':
            return `${ path }sw-10.${ type }`;
        case 'cloudy':
            return `${ path }sw-06.${ type }`;
        case 'partly-cloudy-day':
            return `${ path }sw-03.${ type }`;
        case 'partly-cloudy-night':
            return `${ path }sw-07.${ type }`;
        case 'N':
            return `${ path }sw-41.${ type }`;
        case 'E':
            return `${ path }sw-42.${ type }`;
        case 'S':
            return `${ path }sw-43.${ type }`;
        case 'W':
            return `${ path }sw-44.${ type }`;
        case 'NE':
            return `${ path }sw-45.${ type }`;
        case 'SE':
            return `${ path }sw-46.${ type }`;
        case 'SW':
            return `${ path }sw-47.${ type }`;
        case 'NW':
            return `${ path }sw-48.${ type }`;
        default:
            return `${ path }sw-01.${ type }`;
    }
}
