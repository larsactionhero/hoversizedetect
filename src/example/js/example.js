import HoverSizeDetect from '../../js/hoversizedetect';
import '../scss/style.scss';

const myHoverSizeDetectInstance = new HoverSizeDetect({
  breakpoint: 992,
  debug: true,
});

document.addEventListener('DOMContentLoaded', () => {
  myHoverSizeDetectInstance.init();
});
