import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';

const iframeRef = document.querySelector('#vimeo-player');

const player = new Player(iframeRef);

function saveTime (data) {

    localStorage.setItem(TIME_KEY, data.seconds);
    
};

player.on('timeupdate', throttle(saveTime, 1000));

let loadingTime = localStorage.getItem(TIME_KEY);

if (loadingTime) {
    player.setCurrentTime(loadingTime);
};





