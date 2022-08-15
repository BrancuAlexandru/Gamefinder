// get all video titles, make a search with them in background
const thing = () => {
  let videos = document.getElementsByTagName('ytd-grid-video-renderer');
  //console.log(videos);
  let allLoadedVideoTitleAnchors = [document.querySelectorAll("#video-title")][0];
  let allLoadedVideoTitles = [];
  for (e of allLoadedVideoTitleAnchors) {
    allLoadedVideoTitles.push(e.getAttribute('href'));
  }
  console.log(allLoadedVideoTitles);

  clearMyTimeout();
}

const myTimeout = setTimeout(thing, 3500);

const clearMyTimeout = () => {
  clearTimeout(myTimeout);
}

/*
for (i = 0; i < videos.length; i++) {
  (async () => {
    const response = await fetch(`https://youtube.com/watch?v=${videos[i].data.videoId}`);
    const template = await response.text();
    console.log(template);
  })
  let someText = document.createElement('p');
  someText.textContent = 'lalalala';
  someText.style.color = '#ababab';
  videos[i].appendChild(someText);
}
*/