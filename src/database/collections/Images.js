import 'isomorphic-fetch';

import Config from '../../config';
import Image from '../models/Image';

export default class Images
{
    static async all()
    {
        return new Promise(async (resolve, reject) =>
        {
            if (Config.NODE_ENV !== 'production')
            {
                try
                {
                    const _images = await fetch('http://localhost:3000/images');
                    const images = await _images.json();
                    resolve(images);
                }
                catch (error)
                {
                    reject(error);
                }
            }
            else
            {
                try
                {
                    const images = await Image.find();
                    resolve(images);
                }
                catch (error)
                {
                    reject(error);
                }
            }
        });
    }
}
