## Setup

### Prerequisites

First, clone this repo (see [issue #1](https://github.com/virtua-tech/polymer-typescript-starter-kit/issues/1) 
if you want this to be a Polymer CLI template).

You will need to have [npm](https://www.npmjs.com/) installed. After you have installed `npm`, make sure you have the 
[Polymer CLI](https://github.com/Polymer/polymer-cli) and `bower` installed globally:

    npm install -g polymer-cli
    npm install -g bower

Next, install the dependencies:

    npm install
    bower install 

### Build

The included `gulpfile.js` relies on [the `polymer-build` library](https://github.com/Polymer/polymer-build),
the same library that powers Polymer CLI. Out of the box it will clean the
`build` directory, and provide image minification and compile your TypeScript code. Follow the comments in the
`gulpfile.js` to add additional steps like CSS preprocessors.

`gulpfile.js` also generates a `service-worker.js` file with code to pre-cache
the dependencies based on the entrypoint and fragments specified in
`polymer.json`.

    npm run build

### Watch file changes

To re-compile your files via TypeScript whenever there is change, run the `watch` task:

    npm run watch
    
> NOTE: Depending on your editor setup, it may already be doing this for you.

### Start the development server

This command serves the app at `http://127.0.0.1:8081` and provides basic URL
routing for the app:

    polymer serve

**The "http://localhost:8081/view1" contains the example with the issue with Polymer using the icons**

**The "http://localhost:8081/test/index.html" contains the example out of polymer and the icons are working fine**


    