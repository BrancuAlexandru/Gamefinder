const videos = document.getElementsByTagName('ytd-grid-video-renderer');
const video = videos[0];

console.log(video);

getVideos = async () => {
  let link = video.getElementsByClassName('ytd-thumbnail');
  const response = await fetch(`https://youtube.com${link}`);
  const template = await response.text();
  console.log(template);
}

getVideos();

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