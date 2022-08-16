// get all video IDs, then make a GET request for the video's html, then filter it for game title, then append game title as <p> to each video

  // Filtering out the shorts from the ID list
const filterShortVideoIDs = (allLoadedVideoIDs) => {
  return allLoadedVideoIDs.filter(id => id.includes('/watch?v='));
}

  // Getting video IDs
const getVideoIDs = () => {
  let allLoadedVideoTitles= [document.querySelectorAll("#video-title")][0];
  let allLoadedVideoIDs = [];
  for (e of allLoadedVideoTitles) {
    allLoadedVideoIDs.push(e.getAttribute('href'));
  }
  let videoIDFilteredList = filterShortVideoIDs(allLoadedVideoIDs);
  clearMyTimeout();
}

const myTimeout = setTimeout(getVideoIDs, 3500);

const clearMyTimeout = () => {
  clearTimeout(myTimeout);
}

  // note: skip shorts from the appending process
/*
for (i = 0; i < videos.length; i++) {
  (async () => {
    const response = await fetch(`https://youtube.com/watch?v=${videos[i].data.videoId}`);
    const template = await response.text();
    console.log(template);
  })
  let gameTitle = document.createElement('p');
  someText.textContent = response.lalala;
  someText.style.color = '#ababab';
  videos[i].appendChild(someText);
}
*/