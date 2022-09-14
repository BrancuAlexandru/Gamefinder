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

const createButtons = async (videos) => {
    // if the value in the arguments list is falsy, use allLoadedVideoTitles
    // else use the value
  let allLoadedVideoTitles;
  if (!videos) {
    allLoadedVideoTitles = [...document.querySelectorAll("#video-title")];
  } else {
    allLoadedVideoTitles = videos;
  }
  let allLoadedVideoIDs = [];
  let allLoadedVideos = [];

  for (let e of allLoadedVideoTitles)  {
    allLoadedVideoIDs.push(e.parentElement.parentElement.parentElement.getAttribute('href'));
    allLoadedVideos.push(allLoadedVideoTitles[allLoadedVideoTitles.indexOf(e)]);
  }

  for (const e of allLoadedVideos) {
    if (e.parentElement.parentElement.parentElement.querySelector('#gameNameExtensionButton') === null) {
      let videoElement = allLoadedVideoTitles[allLoadedVideoTitles.indexOf(e)];
      let id = allLoadedVideoTitles[allLoadedVideoTitles.indexOf(e)].parentElement.parentElement.getAttribute('href');
      let button = document.createElement('button');
      button.textContent = "Find Game";
      button.style.color = '#dcdcdc';
      button.style.backgroundColor = "#454545";
      button.style.padding = "5px 10px";
      button.style.cursor = "pointer";
      button.style.border = "0";
      button.id = 'gameNameExtensionButton';
      let game;
      let gameText = document.createElement('h3');
      gameText.style.color = '#ababab';
      button.addEventListener('click', async () => {
        game = await getHTMLFromVideo(id);
        gameText.textContent = game;
        videoElement.parentElement.parentElement.appendChild(gameText);
        button.remove();
      });
      e.parentElement.parentElement.parentElement.appendChild(button);
    }
  }
}

const clearMyInterval = () => {
  clearInterval(myInterval);
}

const videosAreLoaded = document.getElementsByTagName('yt-img-shadow')[0];

const getNumberOfLoadedVideos = () => {
  return [...document.querySelectorAll("#video-title")].length;
}

let videoCount;

const checkIfVideosAreLoaded = () => {
  if (videosAreLoaded) {
    createButtons();
    videoCount = getNumberOfLoadedVideos();
    clearMyInterval();
  }
}

const getLoadedVideos = () => {
  return [...document.querySelectorAll("#video-title")];
}

let loadedVideos = getLoadedVideos();

const checkForNewVideos = () => {
  let newVideoCount = [...document.querySelectorAll("#video-title")].length;
  if (newVideoCount > videoCount) {
    createButtons();
  }
  videoCount = newVideoCount;
}

const myInterval = setInterval(checkIfVideosAreLoaded, 300);
const newLoadedVideosInterval = setInterval(checkForNewVideos, 300);