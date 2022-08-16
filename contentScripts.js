// get all video IDs, then make a GET request for the video's html, then filter it for game title, then append game title as <p> to each video

const videosAreLoaded = document.getElementsByTagName('yt-img-shadow')[0];

const clearMyInterval = () => {
  clearInterval(myInterval);
}

const checkIfVideosAreLoaded = () => {
  if (videosAreLoaded) {
      // Filtering out the shorts from the ID list
    const filterShortVideoIDs = (allLoadedVideoIDs) => {
      return allLoadedVideoIDs.filter(id => id.includes('/watch?v='));
    }

      // Using video ID to get the HTML which includes the game title
    const getHTMLFromVideo = async (id) => {
        // note: filter out non gaming videos, append only gaming category titles to videos
      await fetch('https://www.youtube.com' + id)
      .then((response) => response.text())
      .then((html) => console.log(html))
      .catch((err) => {
        console.warn('Something went wrong.', err);
      });
    }

    const getVideoIDs = () => {
      let allLoadedVideoTitles= [document.querySelectorAll("#video-title")][0];
      let allLoadedVideoIDs = [];
      for (e of allLoadedVideoTitles) {
        allLoadedVideoIDs.push(e.getAttribute('href'));
      }

      let videoIDFilteredList = filterShortVideoIDs(allLoadedVideoIDs);
      //for (let i = 0; i < videoIDFilteredList.length; i++) {
        getHTMLFromVideo(videoIDFilteredList[2]);
        // The video page has 10 - "title":{"simpleText":" - and the second one has the game name after it followed by - "}
      //}
    }
    getVideoIDs();
    clearMyInterval();
  }
}

const myInterval = setInterval(checkIfVideosAreLoaded, 500);

/* 
  - Get index of removed IDs from videoIDFilteredList, and remove those at the same index from allLoadedVideoIDs
  - Get all /["title":{"simpleText":"..."}]/ from the HTML, then put them in an array, then remove all but the 2nd
  - Append the name indexed in videoIDFilteredList to a video with the same index as a <p>
  - Modify the timeout method from setTimeout to a check every 500ms if something inside the video element exists
  - Detect if new videos are loaded, if so run the main function again, but only for the newly loaded videos (maybe scroll position)
*/