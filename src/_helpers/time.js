export const date = (date) => date.toLocaleDateString().slice(0, -5);
export const time = (date) => date.toLocaleTimeString().replace(/(:\d\d)(:\d\d)/g, '$1');
export const local = (dateLike) =>
{
    const t = new Date(dateLike);
    return `${ date(t) } ${ time(t) }`;
}
