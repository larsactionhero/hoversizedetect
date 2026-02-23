/**
 * tries to identify desktop device (with mouse/trackpad).
 *
 * usually this is the case with:
 * 1) (any-hover: hover) AND
 * 2) (pointer: fine)
 *
 * [i] touchscreen devices without mouse/trackpad usually identify theirselves with (pointer: coarse)
 *
 * note: (<940 and no-hover is not realistic BUT chrome on android identifies itself as any-hover:true).
 *
 * a e.g.
 * window.matchMedia('(max-width: 567px) and (any-hover: hover) and (pointer: coarse)');
 */
export default class HoverSizeDetect {
  constructor(options) {
    this.options = options;
    this.hasHover = false;
    this.isAbove = false;
    this.breakpoint = null;
    this.deviceInfo = {};
    this.breakpoint = options.breakpoint || 992;
    this.debug = options.debug || false;
    this.queries = {
      '(pointer: coarse)': 'touchMobile',
      '(pointer: fine), (pointer: none) and (any-hover: hover)': 'desktop',
      '(pointer: fine) and (any-pointer: coarse)': 'touchDesktop',
    };
  }

  deviceMatchMedia(query) {
    const mediaQueryList = window.matchMedia(query);
    return mediaQueryList.matches;
  }

  getMediaQueryList() {
    this.deviceMode = '';

    for (const [query, type] of Object.entries(this.queries)) {
      if (this.deviceMatchMedia(query)) {
        this.deviceInfo.query = query;
        this.deviceInfo.type = type;
        if (type === 'desktop')
          this.hasHover = true;
      }
    }
  }

  /**
   * @param {Array or String} arg array or string of class(es)
   * @param {number} mode 1: add, 0: remove
   */
  setBodyClass(arg, mode = 1) {
    const tmpArr = [];
    const bodyEl = document.body;
    if (!Array.isArray(arg) || typeof arg === 'string')
      tmpArr.push(arg);
    if (mode === 1) {
      bodyEl.classList.add(...tmpArr);
    }
    else {
      bodyEl.classList.remove(...tmpArr);
    }
  }

  /**
   * @param {Array or String} arg array or string of class(es)
   */
  addBodyClass(cls) {
    this.setBodyClass(cls, 1);
  }

  /**
   * @param {Array or String} arg array or string of class(es)
   */
  removeBodyClass(cls) {
    this.setBodyClass(cls, 0);
  }

  /**
   * meta fn to sret body classes along screen info
   */
  setDeviceInfoBodyClasses() {
    if (this.hasHover) {
      this.removeBodyClass('no-hover');
      this.addBodyClass('has-hover');
    }
    else {
      this.removeBodyClass('has-hover');
      this.addBodyClass('no-hover');
    }

    if (this.isAbove) {
      this.removeBodyClass(`is-below-${this.breakpoint}`);
      this.addBodyClass(`is-above-eq-${this.breakpoint}`);
    }
    else {
      this.removeBodyClass(`is-above-eq-${this.breakpoint}`);
      this.addBodyClass(`is-below-${this.breakpoint}`);
    }
  }

  /**
   *
   * @param {number} winW current screen width
   * @param {number} winH current screen height
   */
  setDeviceInfoSize(winW, winH) {
    this.deviceInfo.size = {
      width: winW,
      height: winH,
    };
  }

  /**
   *
   */
  setDeviceInfoMode() {
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    this.isAbove = winW >= this.breakpoint;
    this.setDeviceInfoSize(winW, winH);

    // 1) >= bp, has hover
    if (this.isAbove && this.hasHover) {
      this.deviceInfo.info = `is >= ${this.breakpoint}, has hover`;
      this.deviceInfo.mode = 1;
      this.deviceInfo.hasHover = true;
    }

    // 2) < bp, no hover
    if (!this.isAbove && !this.hasHover) {
      this.deviceInfo.info = `is < ${this.breakpoint}, no hover`;
      this.deviceInfo.mode = 2;
      this.deviceInfo.hasHover = false;
    }

    // 3) >= bp, no hover
    if (this.isAbove && !this.hasHover) {
      this.deviceInfo.info = `is >= ${this.breakpoint}, no hover`;
      this.deviceInfo.mode = 3;
      this.deviceInfo.hasHover = false;
    }

    // 4) < bp, has hover
    if (!this.isAbove && this.hasHover) {
      this.deviceInfo.info = `is < ${this.breakpoint}, has hover`;
      this.deviceInfo.mode = 4;
      this.deviceInfo.hasHover = true;
    }

    this.setDeviceInfoBodyClasses();
  }

  getInfo() {
    return this.deviceInfo;
  }

  debugOutput() {
    const debugOutputElement = document.getElementById('example-output');
    if (debugOutputElement) {
      debugOutputElement.innerHTML = `<pre>${JSON.stringify(this.deviceInfo, undefined, 2)}</pre>`;
    }

    console.log(this.deviceInfo);
  }

  init() {
    this.getMediaQueryList();
    this.setDeviceInfoMode(); // initially set info

    const resizeObserver = new ResizeObserver((entries) => {
      this.setDeviceInfoSize(entries[0].target.clientWidth, entries[0].target.clientHeight);
      this.setDeviceInfoMode();
      if (this.debug === true)
        this.debugOutput();
    });

    resizeObserver.observe(document.body);
  }
}
