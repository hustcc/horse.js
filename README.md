# horse.js

> Progressive and customizable autocomplete component

Browser support includes every sane browser and **IE7+**.

# Demo!

You can see a [live demo here](http://git.hust.cc/horse.js/).

or `USAGE` in website: [www.aTool.org](http://www.atool.org)

![screenshot.png](screenshot/1.png)

# Inspiration

I needed a fast, easy to use, and reliable autocomplete library. The ones I stumbled upon were too bloated, too opinionated, or provided an unfriendly human experience, or the **js file is too large**.

- [https://github.com/bevacqua/horsey](https://github.com/bevacqua/horsey)
- [https://github.com/bevacqua/fuzzysearch](https://github.com/bevacqua/fuzzysearch)

# Features

- Small and focused, **2.96kb**, smaller after gzip
- Natural keyboard navigation
- Fuzzy searching
- Supports `<input>` elements

# Install

Just link to you website use `link` and `script`.

# Options

Entry point is `horse(el, options)`. Configuration options are detailed below.

### `suggestions`

An array containing a list of suggestions to be presented to the user. Each suggestion can be either a string or an object. If an object is used, the `text` property will be used for displaying the suggestion and the `value` property will be used when a suggestion is selected.

### `limit`

Allows you to limit the amount of search results that are displayed by `horsey`. Defaults to `Infinity`.

### `onselect`

Allows you set the event handler when select an option.

**How to use the OPTIONs, can see detail in the live demo**, [live demo here](http://git.hust.cc/horse.js/).

# License

MIT
