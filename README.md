# Line-truck

This project was bootstrapped using `create-react-app` and was ejected for customizing purpose.

## Deploy to Docker container

The app is also available as a [Docker](https://www.docker.com/) container. Default port is 3000 and it uses "production" build upon deployment.

# Prerequisites:

- NodeJS 8+ (Installing with [NVS](https://github.com/jasongin/nvs) is recommended)
- node-gyp. Install by using following command: `npm i -g node-gyp`

## Project structures

````
├── actions
├── api
├── assets
│   ├── fonts
│   ├── icons
│   ├── images
│   └── styles
├── common
├── components
│   ├── button
│   ├── header
│   │   ├── header-button
│   │   └── searchbox
│   ├── logo
│   └── swtich
├── reducers
├── routes
│   ├── authen
│   │   ├── products
│   │   ├── purchase-request
│   │   └── successful
│   └── guest
│       └── login
│           └── login-form
├── sagas
├── stores
└── utils
````

As you can see, we use Redux and Redux Saga. I am not a Redux maniac, but it's so popular that people usually thought it was "essential" part of a React project.

But anyway, it's easy to get on with it, and there is excellent documentation out there, here we go:

- *Actions*: Contains Redux and `react-router`'s actions. It also contains `types.js` which holds all action types, to be used with those in `reducers` too.

- *Api*: Contains network api-related files. The root api factory is `api.js`, all header modifications, interceptors should be put here.

- *Assets*: Contains external resource files, such as images, audio files, icons and so on.

- *Common*: Contains global-wide used functions and components, such as localization, common color list, and pre-defined configurations. It is also configured as a sub-module. So you can use any part of it in a package named `brenntag-common` like this:

- *Components*: Contains reusable components, some of which are not classified into any folder, which means they are used usually. The folder depth should not be larger than 1.

- *Reducers* and *Sagas*: Reducers to be used by redux, and for side-effect processing (with powerful redux-saga library).

- *Routes*: Contain root entries to app's individual screens. Each screen is connected directly with the main `Router`. `authen-routes` and `guest-routes` are self-explained.

- *Stores*: Contain a single `redux`'s store. May change in the future.

- *Utils*: Contains utility functions, like, unit converters, field data validator, field data formatters,...

There are, however, some extra development libraries:

- [standardjs](https://standardjs.com/) for code linting and formatting.
- `snazzy` (Conjunction with StandardJS)
- `lint-staged` (Detect staged files and run tests / linting with it before going to next steps).
- [reselect](https://github.com/reduxjs/reselect) (Memoized state for Redux, *TL;DR*: Redux performance enhancer).
- Jest: For snapshot testing.
- Enzyme: Component rendering test.
- `node-sass-chokidar`: Replacement for node-sass (there are some rare issues on MacOS regarding CPU usages may rise up to 300%).

For testing, we still use Jest - Mocha - Enzyme stack. Hence `__tests__` and `__mocks__` folders.

Last but not least, we will use StandardJS for code linting. Why standardjs? It's simple, "just works" and requires very little setup, yet efficient. All you need to do is installing packages:

`npm i standard snazzy husky lint-staged --save`

And refer to `package.json` file for an example to setup properly. Instead of installing a bunch of `eslint` packages like this one below (ewww):

````
"eslint": "^3.19.0",
"eslint-config-airbnb": "^15.1.0",
"eslint-config-prettier": "^2.6.0",
"eslint-plugin-flowtype": "^2.37.0",
"eslint-plugin-import": "^2.7.0",
"eslint-plugin-jest": "^21.2.0",
"eslint-plugin-jsx-a11y": "5.0.1",
"eslint-plugin-prettier": "^2.3.1",
"eslint-plugin-react": "^7.4.0",
"eslint-plugin-react-native": "^3.1.0",
````

With standardjs successfully setup, we will have code files formatted like this:

````jsx
import React, { Component } from 'react'
import { Card, Modal } from 'antd'

export class FavoriteDetail extends Component { // Camel-case
  render () { // Space after method name
    return (
      <Card // 2 spaces indent.
        bordered={false}
        title={`Data`}
        extra={<p className='detail' href='#'>Test</p>} // Prefer single-quote.
        className='card'
      >
        <p>Data</p>
      </Card>
    )
    // JSX close tag at new line.
  }
}

````

## Core Libraries

- `react-router v4`
- `redux`
- `react-redux`
- `redux-saga`
- `formik`: For complex form processing, validating and submitting
- `reselect`: Selector for redux.
- `momentjs`: Date and time library.
- `lodash`: Javascript utility library.
