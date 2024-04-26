import '../scss/style.scss';
import HoverSizeDetect from '../../js/hoversizedetect';

const myHoverSizeDetectInstance = new HoverSizeDetect({
  breakpoint: 992,
  debug: true,
});

document.addEventListener('DOMContentLoaded', () => {
  myHoverSizeDetectInstance.init();
});
