export default (degree) =>
{
    if (degree === 0 || degree === 360)
    {
        return 'N';
    }
    else if (degree < 90)
    {
        return 'NE';
    }
    else if (degree === 90)
    {
        return 'E';
    }
    else if (degree < 180)
    {
        return 'SE';
    }
    else if (degree === 180)
    {
        return 'S';
    }
    else if (degree < 270)
    {
        return 'SW';
    }
    else if (degree === 270)
    {
        return 'W';
    }
    return 'NW';
};
