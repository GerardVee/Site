## gerardvee.com

[![Build Status](https://travis-ci.org/GerardVee/site.svg?branch=master)](https://travis-ci.org/GerardVee/site)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The source for my website.

Please give credit!

## Requirements

1. **node.js >= 8**

2. an .env file detailing the following:

* DARKSKY_API_KEY
* FORISMATIC_KEY
* NO_REPLY_SERVICE (service for nodemailer [ Gmail, etc. ])
* NO_REPLY_EMAIL (nodemailer email)
* NO_REPLY_PASSWORD (nodemailer password)
* NO_REPLY_FORWARDS (example [exact syntax]: example1@gmail.com, example2@gmail.com)
* NODE_ENV (either dev for developement or production for production)
* MONGOOSE_CONNECT_LOCATION (the path to your mongodb connection)
* PORT_ADDR (port number for your app)
* BASE_URL (the base url for your online presence, usually http://localhost:{PORT_ADDR}/ for development, and an accessible url for production)

3. global installation of [localtunnel](https://github.com/localtunnel/localtunnel) for seeing the app anywhere and [json-server](https://github.com/typicode/json-server) for server mockups.

## What to modify (SOON)
 
Navigate to localhost:{PORT_ADDR}/manage, and have fun editing to your liking!

## How to run

### Development

#### Server-side focused editing (RECOMMENDED!)

```bash
yarn start
```

#### Client-side focused editing

```bash
yarn run dev
```

Edit to your heart's desire (reloading is enabled)!

#### Online testing

```bash
lt --port [PORT_ADDR]
```

then in another shell, edit your .env file to contain your new url as the BASE_URL, and run

```bash
yarn run dev
```

to make it available for all to see using localtunnel.

#### Testing

```bash
yarn test
```

Eslint and jest will test our code!

### Production

run

```bash
yarn run build
yarn run start-prod
```

## Reason for creation

To make my [site](https://gerardvee.com/) open sourced!

## Tips

Never forget to chmod +x post-receive on your remote server's hooks.

Remember to independently update your .env file on both your client and your server.