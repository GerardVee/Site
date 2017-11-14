import 'isomorphic-fetch';

import Config from '../../config';
import SContent from '../models/SContent';

export default class Content
{
    static async all()
    {
        return new Promise(async (resolve, reject) =>
        {
            if (Config.NODE_ENV !== 'production')
            {
                try
                {
                    const _content = await fetch('http://localhost:3000/content');
                    const content = await _content.json();
                    resolve(content);
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
                    const content = await SContent.find();
                    resolve(content);
                }
                catch (error)
                {
                    reject(error);
                }
            }
        });
    }
}
