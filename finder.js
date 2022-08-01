const getVideos = () => {
  if (window.HTMLTitleElement.match('YouTube')) {
    console.log("found 'em");
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('Gamefinder loaded.');
  getVideos();
});