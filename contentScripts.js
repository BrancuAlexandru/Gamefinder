// get all video IDs, then make a GET request for the video's html, then filter it for game title, then append game title as <p> to each video

const videosAreLoaded = document.getElementsByTagName('yt-img-shadow')[0];

const clearMyInterval = () => {
  clearInterval(myInterval);
}

const checkIfVideosAreLoaded = () => {
  if (videosAreLoaded) {
    const getGameName = (html) => {
      const gameNameRegex = /(?<="title":{"simpleText":)(["'])(?:(?=(\\?))\2.)*?\1/g;
        // Regular expression breakdown:
        // (?<="title":{"simpleText":) everything after "title":{"simpleText":
        // (["']) everything in quotes up to \1 (end quote)
        // (?:(?=(\\?))\2.)*? ingore backslashes
      let gameNames = [...html.matchAll(gameNameRegex)][1][0];
      if (gameNames.includes("Mix - ") || gameNames.includes("You may also like...")) {
        gameNames = null;
      }
    }

      // Using video ID to get the HTML which includes the game title
    const getHTMLFromVideo = async (id) => {
      let html = await fetch('https://www.youtube.com' + id)
      .then((response) => response.text())
      .catch((err) => {
        console.warn('Something went wrong.', err);
      });
      let categoryRegex = html.match(/(?<="category":)(["'])(?:(?=(\\?))\2.)*?\1/g);
        // Regular expression breakdown:
        // (?<="category":) everything after "category":
        // (["']) everything in quotes up to \1 (end quote)
        // (?:(?=(\\?))\2.)*? ingore backslashes
      if (categoryRegex[0] === `"Gaming"`) {
        getGameName(html);
      }
    }

    const getVideoIDs = () => {
      let allLoadedVideoTitles= [document.querySelectorAll("#video-title")][0];
      let allLoadedVideoIDs = [];
      for (let e of allLoadedVideoTitles) {
        allLoadedVideoIDs.push(e.getAttribute('href'));
      }

        // Filtering out the shorts from the ID list
      const filterShortVideoIDs = (allLoadedVideoIDs) => {
        return allLoadedVideoIDs.filter(id => id.includes('/watch?v='));
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

const myInterval = setInterval(checkIfVideosAreLoaded, 300);

/*
  - Get index of removed IDs from videoIDFilteredList, and remove those at the same index from allLoadedVideoIDs
  - Get all /["title":{"simpleText":"..."}]/ from the HTML, then put them in an array, then remove all but the 2nd
  - Append the name indexed in videoIDFilteredList to a video with the same index as a <p>
  - Detect if new videos are loaded, if so run the main function again, but only for the newly loaded videos (maybe scroll position)
*/