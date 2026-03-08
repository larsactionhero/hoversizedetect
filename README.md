# hoversizedetect.js
[![npm version](https://img.shields.io/npm/v/hoversizedetect)](https://www.npmjs.com/package/hoversizedetect)
[![npm downloads](https://img.shields.io/npm/dm/hoversizedetect)](https://www.npmjs.com/package/hoversizedetect)
[![license](https://img.shields.io/npm/l/hoversizedetect)](https://github.com/larsactionhero/hoversizedetect/blob/main/LICENSE)  

🔗 <a href="https://larsactionhero.com/hoversizedetect/" target="_blank">https://larsactionhero.com/hoversizedetect/</a>

-----

hoversizedetect.js is a tiny vanilla js script (~1.63kB minified) that collects a device's information provided in `window.matchMedia`.  
Useful for detecting hover ability on devices and getting their screen size.  
The collected data shares at least enough information so that most cases for mobile/touch and desktop devices can targeted.
Let's say it works as a **mobile and touch device detection.**

It watches for  
1) the device's hover ability 
2) if a precise pointer device like a mouse or trackpad is available.
  

## Installation  

### NPM Package
🔗 <a href="https://www.npmjs.com/package/hoversizedetect/" target="_blank">https://www.npmjs.com/package/hoversizedetect</a>

```
npm install hoversizedetect
```

## Setup
```javascript
import HoverSizeDetect from 'hoversizedetect';

const myHoverSizeDetectInstance = new HoverSizeDetect({
  breakpoint: 992, // in px
  debug: true, // shows info in console (e.g. for development purposes)
});

myHoverSizeDetectInstance.init(); // initialize
```

## Options
| Option | Type | Default | Description |
|:---|:---|:---|:---|
| breakpoint | Number | 992 | Matches against `min-width` rule (in px).<br>_Example:_<br>if config value is set to **768**, info will return:  **is >= 768px**
| debug | Boolean | false | if true, collected info appears  in console. |

## .matchmedia() queries
| Query | Result |
|:---|:---|
| `(pointer: coarse)` | touchMobile  |
| `(pointer: fine), (pointer: none) and (any-hover: hover)` | desktop |
| `(pointer: fine) and (any-pointer: coarse)` | touchDesktop*  |

 _* e.g. a touch screen laptop with hover ability, but no pointer device connected._


## Body classes
Body classes are set depending on screen size and hover ability.<br>
Use them for your needs. Be creative! 🙂

| breakpoint | hover mode | screen mode |  body classes |
|:---|:---|:---|:---|
| <div style="width:180px">>= `options.breakpoint`</div> | has hover | 1 | `.is-above-eq-{options.breakpoint}`,<br> `.has-hover`  |
| <div style="width:180px">< `options.breakpoint`</div> | no hover | 2 | `.is-below-{options.breakpoint}`,<br> `.no-hover` |
| <div style="width:180px">>= `options.breakpoint`</div> | no hover | 3 | `.is-above-eq-{options.breakpoint}`,<br> `.no-hover` |
| <div style="width:180px">< `options.breakpoint`</div> | has hover | 4 | `.is-below-{options.breakpoint}`,<br> `.has-hover` |


## Collected data
Collected data can be accessed via `myHoverSizeDetectInstance.getInfo();` while `.getInfo()` returns data as object.<br>
```javascript
const collectedInfo = myHoverSizeDetectInstance.getInfo(); 
```

### Example<br>
A device e.g. in 1920x1080px with mouse device connected returns the following data:
```
// content of collectedInfo:
{
  query: "(pointer: fine), (pointer: none) and (any-hover: hover)",
  type: "desktop",
  size: {
    width: 1920,
    height: 1080
  },
  info: "is >= 992, has hover",
  mode: 1,
  hasHover: true
}
```

## Demo
<a href="https://larsactionhero.com/hoversizedetect/example" target="_blank">https://larsactionhero.com/hoversizedetect/example</a>  
ℹ️ Open browser console to see data output.
