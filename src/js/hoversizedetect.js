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
  // eslint-disable-next-line no-unused-vars
  constructor(options) {
    this.mediaQueryList = null;
    this.hasHoverMode = false;
    this.isAbove = false;
    this.breakpoint = 992 || options.breakpoint;
  }

  getMediaQueryList() {
    // get media query list
    this.mediaQueryList = window.matchMedia('(any-hover: hover) and (pointer: fine)');
    this.hasHover = this.mediaQueryList.matches;
  }

  /**
   * @param {Array or String} arg array or string of class(es)
   * @param {Number} mode 1: add, 0: remove
   */
  setBodyClass(arg, mode = 1) {
    const tmpArr = [];
    const bodyEl = document.body;
    if (!Array.isArray(arg) || typeof arg === 'string') tmpArr.push(arg);
    if (mode === 1) {
      bodyEl.classList.add(...tmpArr);
    } else {
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
  setBodyClasses() {
    if (this.hasHover) {
      this.removeBodyClass('no-hover');
      this.addBodyClass('has-hover');
    } else {
      this.removeBodyClass('has-hover');
      this.addBodyClass('no-hover');
    }

    if (this.isAbove) {
      this.removeBodyClass(`is-below-${this.breakpoint}`);
      this.addBodyClass(`is-above-${this.breakpoint}`);
    } else {
      this.removeBodyClass(`is-above-${this.breakpoint}`);
      this.addBodyClass(`is-below-${this.breakpoint}`);
    }
  }

  /**
   *
   */
  setDeviceInfo() {
    this.isAbove = window.innerWidth >= this.breakpoint;

    // 1) >= bp, has hover
    if (this.isAbove && this.hasHover) {
      this.deviceInfo = {
        info: `is >= ${this.breakpoint}, has hover`,
        mode: 1,
      };
    }

    // 2) < bp, no hover
    if (!this.isAbove && !this.hasHover) {
      this.deviceInfo = {
        info: `is < ${this.breakpoint}, no hover`,
        mode: 2,
      };
    }

    // 3) >= bp, no hover
    if (this.isAbove && !this.hasHover) {
      this.deviceInfo = {
        info: `is >= ${this.breakpoint}, no hover`,
        mode: 3,
      };
    }

    // 4) < bp, has hover
    if (!this.isAbove && this.hasHover) {
      this.deviceInfo = {
        info: `is < ${this.breakpoint}, has hover`,
        mode: 4,
      };
    }

    this.setBodyClasses();
  }

  getInfo() {
    return this.deviceInfo;
  }

  init() {
    this.getMediaQueryList();
    this.setDeviceInfo();
  }
}
