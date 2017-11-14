import React from 'react';
import ReactDOMServer from 'react-dom/server';
import nodemailer from 'nodemailer';
import { ServerStyleSheet } from 'styled-components';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import express from 'express';

import Images from './database/collections/Images';
import Content from './database/collections/Content';
import App from './app';
import Config from './config';
import allReducers from './ducks/combined';
import site from './templates/site';

const PROD = Config.NODE_ENV !== 'dev';

const nodemailerConfig =
{
    service: Config.NO_REPLY_SERVICE,
    auth:
    {
        user: Config.NO_REPLY_EMAIL,
        pass: Config.NO_REPLY_PASSWORD
    }
};

const emailTransporter = nodemailer.createTransport(nodemailerConfig);

const makeStore = (preloadedState) =>
{
    return createStore(allReducers, preloadedState, applyMiddleware(thunkMiddleware));
};

const app = express.Router();

app.post('/contact', async (req, res) =>
{
    const { name, email, phone, website, query } = req.body;
    try
    {
        const to = Config.NO_REPLY_FORWARDS;
        const options =
        {
            from: `"${ name }" <${ email }>@[${ website }]`,
            to,
            subject: `${ name } wishes to contact you!`,
            text: `
            "${ query }" ${ name } @ <${ email }> says.
            ${ phone ? `Here is there phone number to contact them: ${ phone }.` : "Sadly they didn't provide a phone number for you to contact them." }`,
            html: `<blockquote>${ query }<footer> - ${ name }</footer></blockquote><br/><b>${ phone ? `Here is there phone number to contact them: ${ phone }.` : "Sadly they didn't provide a phone number for you to contact them." }</b>`
        };
        emailTransporter.sendMail(options, (err, info) =>
        {
            if (err)
            {
                console.log(err);
                res.send(false);
            }
            else
            {
                res.send(true);
            }
        });
    }
    catch (error)
    {
        console.log(error);
        res.send(false);
    }
});

app.get('/content', async (req, res) =>
{
    const content = await Content.all();
    res.send(content);
});

app.get('/images', async (req, res) =>
{
    const images = await Images.all();
    res.send(images);
});
/*
 * due to *, we must require this route last on our actual site app
 */
app.get('*', async (req, res) =>
{
    const content = await Content.all();
    const images = await Images.all();
    const context = { };
    const store = makeStore({ content, images });
    const state = store.getState();
    const sheet = new ServerStyleSheet();
    const appHtml = ReactDOMServer.renderToString(sheet.collectStyles(<App location={ req.url } context={ context } store={ store }/>));
    const styles = sheet.getStyleTags();
    if (context.url)
    {
        res.writeHead(301, { Location: context.url });
        res.end();
    }
    else
    {
        res.send(site({ body: appHtml, store: state, styles, production: PROD }));
    }
});

export default app;
