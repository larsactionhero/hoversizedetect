# hover & size detect
hoversizedetect.js looks for a device's information provided in `window.matchMedia`.  
Currently it looks for  
1) the device's hover ability, and  
2) if a precise pointer device like a mouse or trackpad is available.  
  

It's written in vanilla javascript and comes without any further dependencies. 

## Installation
```npm
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
| breakpoint | Number | 992 | Matches against `min-width` rule (in px).<br>_Example:_<br>if config value is set to **768**, info will return **is >= 768px**.
| debug | Boolean | false | if true, collected info is shown in console |

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
See https://larsactionhero.com/hoversizedetect/example for demo an example (open console to see data).
```
