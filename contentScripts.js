// get all video IDs, then make a GET request for the video's html, then filter it for game title, then append game title as <p> to each video

  // Filtering out the shorts from the ID list
const filterShortVideoIDs = (allLoadedVideoIDs) => {
  return allLoadedVideoIDs.filter(id => id.includes('/watch?v='));
}

  // Using video ID to get the HTML which includes the game title
const getHTMLFromVideo = async (id) => {
    // note: filter out non gaming videos, append only gaming ones
  await fetch('https://www.youtube.com' + id)
  .then((response) => response.text())
  .then((html) => console.log(html))
  .catch((err) => {
    console.warn('Something went wrong.', err);
  });
}

  // Getting video IDs
const getVideoIDs = () => {
  let allLoadedVideoTitles= [document.querySelectorAll("#video-title")][0];
  let allLoadedVideoIDs = [];
  for (e of allLoadedVideoTitles) {
    allLoadedVideoIDs.push(e.getAttribute('href'));
  }
  let videoIDFilteredList = filterShortVideoIDs(allLoadedVideoIDs);

  //for (let i = 0; i < videoIDFilteredList.length; i++) {
    getHTMLFromVideo(videoIDFilteredList[0]);
  //}
  clearMyTimeout();
}

const myTimeout = setTimeout(getVideoIDs, 3500);

const clearMyTimeout = () => {
  clearTimeout(myTimeout);
}