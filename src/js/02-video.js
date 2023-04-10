//Імпортуємо бібліотеки
import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

//Імпортуємо власні файли
import { common } from './helpers_02/common';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);
// Отримуємо поточний час відтворення відео та зберігаємо його в локальному сховищі.
const saveCurrentTime = () => {
  player.getCurrentTime().then((seconds) => {
    localStorage.setItem(common.videoplayerCurrentTime, seconds);
  });
};
// Отримуємо поточний час відтворення відео з локального сховища, та якщо час відтворення є, встановлюємо його
const restoreCurrentTime = () => {
  const currentTime = localStorage.getItem(common.videoplayerCurrentTime);
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
};
// Встановлюэмо збереження часу відтворення не частіше ніж раз на секунду
player.on('timeupdate', throttle(saveCurrentTime, 1000));
// Повертаємо позицію програвача, коли перезавантажуємо чи оновлюмо сторінку
restoreCurrentTime();

