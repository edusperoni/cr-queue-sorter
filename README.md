# CR Queue Sorter [![Build Status](https://travis-ci.com/edusperoni/cr-queue-sorter.svg?branch=master)](https://travis-ci.com/edusperoni/cr-queue-sorter)

This is a simple Crunchyroll queue sorter I made to fix the new abysmal crunchyroll queue.

You can install it using TamperMonkey/GreaseMonkey. Script is in `release/userscript/`.

[Direct link to userscript](https://github.com/edusperoni/cr-queue-sorter/raw/master/release/userscript/bundle.user.js)



## Building:


### Development

On one terminal run `npm run build:dev`.

On another terminal run `npm run serve`.

Add `http://localhost:5001/bundle.proxy.user.js` to your tampermonkey. Open Tampermonkey Configuration > Externals > Select "Always". Open your Crunchyroll Queue. After changing the code and saving you might need to refresh the page twice for it to load properly.

### Release

Run `npm run build:prod` and use `dist/` files.

Run `npm run copy-userscript` to copy dist files to userscript and commit them to the repo.



