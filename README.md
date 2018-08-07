# Spreadsheet by Michael Salaverry

I always wanted to experiment with PouchDB, RXJS, PWAs, and codesandbox.io . This repo manages to scratch all those itches.
Mostly developed via https://codesandbox.io/s/github/barakplasma/RXDB-Spreadsheet

Backup hosting of the live demo https://csb-k5yr4p1q3v-sunpztrden.now.sh/

## This project aims to serve a spreadsheet using an MVC model. 
1. The model is powered by RXDB
  1. RXDB is a combination of 
    1. an isomorphic database with built in sync and offline capabilities
      1. This means that there is a local DB on the client, and one on the server which sync
    1. RXjs which allows for reactive programming based on pub sub
1. The view is powered by React
  1. I buit the frontend using react-datasheet since I firmly believe in not reinventing the wheel
  1. I added components from Material-ui as well (like Modal), since most projects should use an external library for keeping components across projects consistent.
1. The controller allows us to abstract/decouple the model from the view and vice versa

While it would be possible to create a universal app, with server & client in the same artifact,
I chose to use glitch.com since it's the best free host with persistant storage.
So see https://glitch.com/edit/#!/lemon-passive?path=server.js:21:0 for my Node.js server code

## Please Note
1. This app is built to work on mobile as a PWA. Try visiting on the latest version of Chrome.
1. This app is built to be extendable, but doesn't do the typical spreadsheet math yet.
1. I chose not to use TDD since this is a prototype
1. I chose not to use typescript despite my ❤ for it in production usage since this is a prototype on free hosting and types aren't free at build time
1. I chose not to match the implementation schema to the spec. 
  1. If it's important for compatibility, then I'd write a translation layer for it.
  1. An example of a way to access the DB over http: https://lemon-passive.glitch.me/spreadsheet/_design/apiSheetGet/_view/new-view 
1. If there's any doubt to my server skill, check out https://github.com/barakplasma/Rapid-MDB also by me
