chrome.action.onClicked.addListener(() => {
  if (tab.url && tab.url.includes("youtube.com")) {
    const videos = document.getElementsByClassName('ytd-grid-renderer').map((video, id) => {
      videos[id] = video;
    });
  }
  console.log(videos);
})