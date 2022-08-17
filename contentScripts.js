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

    const getGameName = (html) => {
      // only if it is in the gaming category
      const gamingCategoryRegex = /[]/g;
      if (html.match(gamingCategoryRegex)) {
        const gameNameRegex = /"title":{"simpleText":(["'])(?:(?=(\\?))\2.)*?\1}/g;
        let gameNames = [...html.matchAll(gameNameRegex)];
        console.log(gameNames[1][0]);
      }
    }

      // Using video ID to get the HTML which includes the game title
    const getHTMLFromVideo = async (id) => {
        // note: filter out non gaming videos, append only gaming category titles to videos
      await fetch('https://www.youtube.com' + id)
      .then((response) => response.text())
      .then((html) => getGameName(html))
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
      for (let i = 0; i < videoIDFilteredList.length; i++) {
        getHTMLFromVideo(videoIDFilteredList[i]);
      }
    }
    getVideoIDs();
    clearMyInterval();
  }
}

const myInterval = setInterval(checkIfVideosAreLoaded, 100);

/*
  - Get index of removed IDs from videoIDFilteredList, and remove those at the same index from allLoadedVideoIDs
  - Get all /["title":{"simpleText":"..."}]/ from the HTML, then put them in an array, then remove all but the 2nd
  - Append the name indexed in videoIDFilteredList to a video with the same index as a <p>
  - Detect if new videos are loaded, if so run the main function again, but only for the newly loaded videos (maybe scroll position)
*/