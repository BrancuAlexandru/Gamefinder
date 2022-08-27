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
      for (let i = 0; i < 5; i++) {
        elements.push([data.videoIDs[i], data.videos[i]]);
        games.push([data.gameVideoIDs[i], data.gameNames[i]]);
        //console.log(games[i]);
        /*for (let j = 0; j < videos.length; j++) {
          if (games[i][0] === elements[j][0]) {
            let paragraph = document.createElement('p');
            paragraph.textContent = games[i][1];
            paragraph.style.color = '#000000';
            elements[j][1].parentElement.parentElement.appendChild(paragraph); // .parentElement isn't working
          }
        }*/
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
        result = gameName;
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
      let result = {};
      result.videos = videos;

      let videoIDFilteredList = filterShortVideoIDs(allLoadedVideoIDs);
      result.videoIDs = videoIDFilteredList;

      for (let i = 0; i < videoIDFilteredList.length; i++) {
        let response = getHTMLFromVideo(videoIDFilteredList[i]);
        result.gameNames = response[0];
        result.gameVideoIDs = response[1];
      }
      return result;
    }
    getVideoIDs().then((data) => console.log(data));
    //compareGameIdToVideos(data);
    clearMyInterval();
  }
}

const myInterval = setInterval(checkIfVideosAreLoaded, 300);

/*
  - Detect if new videos are loaded, if so run the main function again, but only for the newly loaded videos (maybe scroll position)
*/