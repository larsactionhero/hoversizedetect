class h {
  constructor(e) {
    this.options = e, this.hasHover = !1, this.isAbove = !1, this.breakpoint = null, this.deviceInfo = {}, this.breakpoint = e.breakpoint || 992, this.debug = e.debug || !1, this.queries = {
      "(pointer: coarse)": "touchMobile",
      "(pointer: fine), (pointer: none) and (any-hover: hover)": "desktop",
      "(pointer: fine) and (any-pointer: coarse)": "touchDesktop"
    };
  }
  deviceMatchMedia(e) {
    return window.matchMedia(e).matches;
  }
  getMediaQueryList() {
    this.deviceMode = "";
    for (const [e, i] of Object.entries(this.queries))
      this.deviceMatchMedia(e) && (this.deviceInfo.query = e, this.deviceInfo.type = i, i === "desktop" && (this.hasHover = !0));
  }
  /**
   * @param {Array or String} arg array or string of class(es)
   * @param {number} mode 1: add, 0: remove
   */
  setBodyClass(e, i = 1) {
    const s = [], t = document.body;
    (!Array.isArray(e) || typeof e == "string") && s.push(e), i === 1 ? t.classList.add(...s) : t.classList.remove(...s);
  }
  /**
   * @param {Array or String} arg array or string of class(es)
   */
  addBodyClass(e) {
    this.setBodyClass(e, 1);
  }
  /**
   * @param {Array or String} arg array or string of class(es)
   */
  removeBodyClass(e) {
    this.setBodyClass(e, 0);
  }
  /**
   * meta fn to sret body classes along screen info
   */
  setDeviceInfoBodyClasses() {
    this.hasHover ? (this.removeBodyClass("no-hover"), this.addBodyClass("has-hover")) : (this.removeBodyClass("has-hover"), this.addBodyClass("no-hover")), this.isAbove ? (this.removeBodyClass(`is-below-${this.breakpoint}`), this.addBodyClass(`is-above-eq-${this.breakpoint}`)) : (this.removeBodyClass(`is-above-eq-${this.breakpoint}`), this.addBodyClass(`is-below-${this.breakpoint}`));
  }
  /**
   *
   * @param {number} winW current screen width
   * @param {number} winH current screen height
   */
  setDeviceInfoSize(e, i) {
    this.deviceInfo.size = {
      width: e,
      height: i
    };
  }
  /**
   *
   */
  setDeviceInfoMode() {
    const e = window.innerWidth, i = window.innerHeight;
    this.isAbove = e >= this.breakpoint, this.setDeviceInfoSize(e, i), this.isAbove && this.hasHover && (this.deviceInfo.info = `is >= ${this.breakpoint}, has hover`, this.deviceInfo.mode = 1, this.deviceInfo.hasHover = !0), !this.isAbove && !this.hasHover && (this.deviceInfo.info = `is < ${this.breakpoint}, no hover`, this.deviceInfo.mode = 2, this.deviceInfo.hasHover = !1), this.isAbove && !this.hasHover && (this.deviceInfo.info = `is >= ${this.breakpoint}, no hover`, this.deviceInfo.mode = 3, this.deviceInfo.hasHover = !1), !this.isAbove && this.hasHover && (this.deviceInfo.info = `is < ${this.breakpoint}, has hover`, this.deviceInfo.mode = 4, this.deviceInfo.hasHover = !0), this.setDeviceInfoBodyClasses();
  }
  getInfo() {
    return this.deviceInfo;
  }
  debugOutput() {
    const e = document.getElementById("example-output");
    e && (e.innerHTML = `<pre>${JSON.stringify(this.deviceInfo, void 0, 2)}</pre>`), console.log(this.deviceInfo);
  }
  init() {
    this.getMediaQueryList(), this.setDeviceInfoMode(), new ResizeObserver((i) => {
      this.setDeviceInfoSize(i[0].target.clientWidth, i[0].target.clientHeight), this.setDeviceInfoMode(), this.debug === !0 && this.debugOutput();
    }).observe(document.body);
  }
}
export {
  h as default
};
