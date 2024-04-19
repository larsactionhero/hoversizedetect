# hover & size detect
hoversizedetect.js tries to identify a device's `window.matchMedia` entry.
If a device offers e.g. `(any-hover: hover) and (pointer: fine)`, it's pretty sure it has hover ability and precise pointer device like a mouse or trackpad. 🙂
<br><br>
It's written in vanilla javascript and comes without any further dependencies. 

## Installation
```npm
npm install hoversizedetect
```

## Usage
First, make sure to import dependency:
```javascript
import HoverSizeDetect from 'hoversizedetect';
```

## Setup
Option are passed as `Object`. 
```javascript
const hoversizedetect = new HoverSizeDetect(options);
```

You may pass any breakpoint along your options.<br>
### Basic setup:
```javascript
const hoversizedetect = new HoverSizeDetect({
  breakpoint: 992, // in px
});

hoversizedetect.init(); // call init() to fire plugin
```


### Collected information
**Example:**<br> 
If `options.breakpoint` is set to _992px_, device info will return "_is >= 992px_".<br>Additionally, a body class is added which might be helpful for your mobile device layout.

| Test | Info | Body class |
|---|---|---|
| screen has `(any-hover: hover) and (pointer: fine)` | `mode: 1` | `.has-hover`<br> or<br> `.no-hover` | 
| screen is >= `{options.breakpoint}` | `info: "is >= {options.breakpoint}` | `.is-above-{breakpoint}`<br> or<br> `is-below-{options.breakpoint}` | 

### Returned data
Data is stored in an object and accesible via `hoversizedetect.getInfo();`.<br>
With this information a lot of stuff can be done in css and js. Be creative. 😊<br>
**Example:** <br>
```javascript
const deviceinfo = hoversizedetect.getInfo();

/* 
* deviceinfo contains return value as object: 
* {
*   info: <String>,
*   mode: <Number>
* }
*/
```

| Info _(>= or < breakpoint, hasHover)_  | Mode |
|---|---|
| >= bp, has hover | 1
| < bp, no hover | 2
| >= bp, no hover | 3
| < bp, has hover | 4
