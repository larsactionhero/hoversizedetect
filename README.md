# hover & size detect
hoversizedetect.js reads a device's information provided in `window.matchMedia`.<br>
By watching for `(any-hover: hover) and (pointer: fine)` it looks for <br>
1) the device's hover ability, and <br>
2) if a precise pointer device like a mouse or trackpad is available.<br><br>

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
  debug: true, // shows info in console (e.g. for development purposes)
});

hoversizedetect.init(); // call init() to fire plugin
```


### Returned data
#### Example:
Value of `options.breakpoint` follows the `min-width` rule and is set in px.<br>
So if config value is set to **992**, device info will return "_is >= 992px_".<br>Additionally, a body class is added which might be helpful for your mobile device layout.

| Test case | Returned information | Body css class |
|---|---|---|
| screen has `(any-hover: hover) and (pointer: fine)` | `mode: {screenMode}` | `.has-hover`<br> or<br> `.no-hover` | 
| screen is >= `{options.breakpoint}` | `info: "is >= {options.breakpoint}` | `.is-above-{breakpoint}`<br> or<br> `is-below-{options.breakpoint}` | 

#### Screenmodes:
| screenMode | Returned information |
|---|---|
| 1 | >= bp, has hover 
| 2 | < bp, no hover |
| 3 | >= bp, no hover |
| 4 | < bp, has hover |


Collected data is can be accessed via `hoversizedetect.getInfo();`.<br><br>
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
if(deviceInfo.screenMode === 1) {
  // we're on a device with (any-hover: hover) and (pointer: fine)
}

if(deviceInfo.screenMode === 2) {
  // do something... e.g. enable mobile menu functionality
}

// and so on...
```

