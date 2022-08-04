const videos = document.getElementsByTagName('ytd-grid-video-renderer');
for (i = 0; i < videos.length; i++) {
  let someText = document.createElement('p');
  someText.textContent = 'lalalala';
  someText.style.color = '#ffffff';
  videos[i].appendChild(someText);
}