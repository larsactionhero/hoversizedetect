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
  constructor({ breakpoint = 992, debug = false } = {}) {
    this.hasHover = false;
    this.isAbove = false;
    this.bp = breakpoint;
    this.debug = debug;
    this.deviceInfo = {};
    this.queries = {
      '(pointer: coarse)': 'touchMobile',
      '(pointer: fine), (pointer: none) and (any-hover: hover)': 'desktop',
      '(pointer: fine) and (any-pointer: coarse)': 'touchDesktop',
    };
  }

  /**
   * @param {string} add class to add
   * @param {string} remove class to remove
   */
  toggleBodyClass(add, remove) {
    document.body.classList.add(add);
    document.body.classList.remove(remove);
  }

  /**
   * iterates media queries and sets deviceInfo query/type and hasHover flag
   */
  getMediaQueryList() {
    for (const [query, type] of Object.entries(this.queries)) {
      if (window.matchMedia(query).matches) {
        this.deviceInfo.query = query;
        this.deviceInfo.type = type;
        if (type === 'desktop')
          this.hasHover = true;
      }
    }
  }

  /**
   * sets body classes based on hover capability and breakpoint state
   */
  setDeviceInfoBodyClasses() {
    const bp = this.bp;
    this.toggleBodyClass(
      this.hasHover ? 'has-hover' : 'no-hover',
      this.hasHover ? 'no-hover' : 'has-hover',
    );
    this.toggleBodyClass(
      this.isAbove ? `is-above-eq-${bp}` : `is-below-${bp}`,
      this.isAbove ? `is-below-${bp}` : `is-above-eq-${bp}`,
    );
  }

  /**
   * @param {number} winW current screen width
   * @param {number} winH current screen height
   */
  setDeviceInfoMode(winW = window.innerWidth, winH = window.innerHeight) {
    this.isAbove = winW >= this.bp;
    this.deviceInfo.size = { width: winW, height: winH };

    const isAbove = this.isAbove;
    const hasHover = this.hasHover;
    let info = null;
    let mode = null;

    if (isAbove && hasHover) {
      info = `is >= ${this.bp}, has hover`;
      mode = 1;
    }
    else if (!isAbove && !hasHover) {
      info = `width < ${this.bp}, no hover`;
      mode = 2;
    }
    else if (isAbove && !hasHover) {
      info = `width >= ${this.bp}, no hover`;
      mode = 3;
    }
    else {
      info = `width < ${this.bp}, has hover`;
      mode = 4;
    }

    this.deviceInfo.hasHover = hasHover;
    this.deviceInfo.mode = mode;
    this.setDeviceInfoBodyClasses();
  }

  /**
   * @returns {object} current deviceInfo state
   */
  getInfo() {
    return this.deviceInfo;
  }

  /**
   * outputs deviceInfo to #example-output element and console
   */
  debugOutput() {
    const el = document.getElementById('example-output');
    if (el)
      el.innerHTML = `<pre>${JSON.stringify(this.deviceInfo, null, 2)}</pre>`;
    console.log(this.deviceInfo);
  }

  /**
   * initializes media query detection and attaches ResizeObserver to body
   */
  init() {
    this.getMediaQueryList();
    this.setDeviceInfoMode();

    new ResizeObserver(([entry]) => {
      this.setDeviceInfoMode(entry.target.clientWidth, entry.target.clientHeight);
      if (this.debug)
        this.debugOutput();
    }).observe(document.body);
  }
}
