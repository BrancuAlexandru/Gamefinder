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
      let gameName = [...html.matchAll(gameNameRegex)][1][0];
      let result;

      if (!gameName.includes("Mix - ") && !gameName.includes("You may also like...")) {
        result = gameName.replace(/"/g, '');
      } else {
        result = "No Game Title";
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
        result = getGameName(html);
      } else {
        result = "Not A Game";
      }
      return result;
    }

    // check for new videos being loaded and give them buttons too
    // make home work
    // make recommended work
    const createButtons = async () => {
      let allLoadedVideoTitles = [...document.querySelectorAll("#video-title")];
      let allLoadedVideoIDs = [];
      let allLoadedVideos = [];

      for (let e of allLoadedVideoTitles)  {
        allLoadedVideoIDs.push(e.getAttribute('href'));
        if (e.getAttribute('href').includes('/watch?v=')) {
          allLoadedVideos.push(allLoadedVideoTitles[allLoadedVideoTitles.indexOf(e)]);
        }
      }

      for (const e of allLoadedVideos) {
        let videoElement = allLoadedVideoTitles[allLoadedVideoTitles.indexOf(e)];
        let id = allLoadedVideoTitles[allLoadedVideoTitles.indexOf(e)].getAttribute('href');
        let button = document.createElement('button');
        button.textContent = "Find Game";
        button.style.color = '#dcdcdc';
        button.style.backgroundColor = "#454545";
        button.style.padding = "5px 10px";
        button.style.cursor = "pointer";
        button.style.border = "0";
        let game;
        let gameText = document.createElement('h3');
        gameText.style.color = '#ababab';
        button.addEventListener('click', async () => {
          game = await getHTMLFromVideo(id);
          gameText.textContent = game;
          videoElement.parentElement.parentElement.appendChild(gameText);
          button.remove();
        });
        e.parentElement.parentElement.appendChild(button);
      }
    }
    createButtons();
    clearMyInterval();
  }
}

const myInterval = setInterval(checkIfVideosAreLoaded, 300);

/*
  - Changing the functionality from loading all videos into pressing a button on a video and
  getting the game name just for that one (because currently it is VERY slow, a minute+)
  
  - Detecting when new videos are loaded and putting buttons on those too
*/