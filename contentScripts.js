// get all video IDs, then make a GET request for the video's html, then filter it for game title, then append game title as <p> to each video

const videosAreLoaded = document.getElementsByTagName('yt-img-shadow')[0];

const clearMyInterval = () => {
  clearInterval(myInterval);
}

const checkIfVideosAreLoaded = () => {
  if (videosAreLoaded) {
    const compareGameIdToVideos = (data) => {
      let games = [];
      let elements = [];
      for (let x = 0; x < data.videos.length; x++) {
        elements[x] = [data.videoIDs[x], data.videos[x]];
        games[x] = [data.gameVideoIDs[x], data.gameNames[x]];
      }
      for (let i = 0; i < data.videos.length; i++) {
        for (let j = 0; j < data.videos.length; j++) {
          if (games[i][0] === elements[j][0]) {
            let name = document.createElement('h3');
            name.textContent = games[i][1];
            name.style.color = '#ababab';
            elements[j][1].parentElement.parentElement.appendChild(name);
          }
        }
      }
    }

    const getGameName = (html) => {
      const gameNameRegex = /(?<="title":{"simpleText":)(["'])(?:(?=(\\?))\2.)*?\1/g;
        // Regular expression breakdown:
        // (?<="title":{"simpleText":) everything after "title":{"simpleText":
        // (["']) everything in quotes up to \1 (end quote)
        // (?:(?=(\\?))\2.)*? ingore backslashes
      let gameName = [...html.matchAll(gameNameRegex)][1][0];
      let result;
      if (!gameName.includes("Mix - ") && !gameName.includes("You may also like...")) {
        result = gameName.replace(/"/g, '');
      }
      return result;
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
      let result = [];
      if (categoryRegex[0] === `"Gaming"`) {
        result[0] = getGameName(html);
        result[1] = id;
      }
      return result;
    }

      // Filtering out the shorts from the ID list
    const filterShortVideoIDs = (allLoadedVideoIDs) => {
      return allLoadedVideoIDs.filter(id => id.includes('/watch?v='));
    }

    const getVideoIDs = async () => {
      let allLoadedVideoTitles = [...document.querySelectorAll("#video-title")];
      let allLoadedVideoIDs = [];
      let videos = [];
      for (let e of allLoadedVideoTitles) {
        allLoadedVideoIDs.push(e.getAttribute('href'));
        if (e.getAttribute('href').includes('/watch?v=')) {
          videos.push(allLoadedVideoTitles[allLoadedVideoTitles.indexOf(e)]);
        }
      }
      let data = {
        videos: [],
        videoIDs: [],
        gameNames: [],
        gameVideoIDs: []
      };
      data.videos = videos;

      let videoIDFilteredList = filterShortVideoIDs(allLoadedVideoIDs);
      data.videoIDs = videoIDFilteredList;

      for (let i = 0; i < videoIDFilteredList.length; i++) {
        let response = await getHTMLFromVideo(videoIDFilteredList[i]);
        data.gameNames.push(response[0]);
        data.gameVideoIDs.push(response[1]);
        console.log(`${i}/${videoIDFilteredList.length}`);
      }
      compareGameIdToVideos(data);
    }
    getVideoIDs();
    clearMyInterval();
  }
}

const myInterval = setInterval(checkIfVideosAreLoaded, 300);

/*
  - Changing the functionality from loading all videos into pressing a button on a video and
  getting the game name just for that one (because currently it is VERY slow, a minute+)
  
  - Detecting when new videos are loaded and putting buttons on those too
*/