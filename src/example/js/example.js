import '../scss/style.scss';
import HoverSizeDetect from '../../js/hoversizedetect';

const options = {
  breakpoint: 992,
  debug: true,
  debugOutputElement: document.getElementById('example-output'),
};

const hoversizedetect = new HoverSizeDetect(options);

document.addEventListener('DOMContentLoaded', () => {
  hoversizedetect.init();
});
