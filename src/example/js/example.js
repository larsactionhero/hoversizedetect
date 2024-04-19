import '../scss/style.scss';
import HoverSizeDetect from '../../js/hoversizedetect';

const hoversizedetect = new HoverSizeDetect();

document.addEventListener('DOMContentLoaded', () => {
  hoversizedetect.init({
    breakpoint: 992
  });

  const deviceInfo = hoversizedetect.deviceInfo;

  const exampleOutputElement = document.querySelector('.example-output');
  console.log(deviceInfo)
  exampleOutputElement.innerHTML = `${deviceInfo.info}`;
});
