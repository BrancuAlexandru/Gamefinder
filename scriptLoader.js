
let initialURL = window.location.href;

if (
  initialURL === "https://www.youtube.com/feed/subscriptions" ||
  initialURL === "https://www.youtube.com/feed/explore" ||
  initialURL === "https://www.youtube.com/gaming" ||
  initialURL.match(/https\:\/\/www\.youtube\.com\/c\/.*\/videos/g) ||
  initialURL.match(/https\:\/\/www\.youtube\.com\/user\/.*\/videos/g) ||
  initialURL.includes("https://www.youtube.com/feed/trending")
  ) {

  if (document.getElementById('gamefinderExtensionScript')) {
    document.getElementById('gamefinderExtensionScript').remove();
  };
  let script = document.createElement('script');
  script.id = 'gamefinderExtensionScript';
  script.src = chrome.runtime.getURL("subscriptions.js");
  (document.head || document.documentElement).appendChild(script);
  script.onload = function() {
    this.remove();
  };
} else if (
  initialURL === "https://www.youtube.com/" ||
  initialURL.includes("https://www.youtube.com/channel/")) {

  if (document.getElementById('gamefinderExtensionScript')) {
    document.getElementById('gamefinderExtensionScript').remove();
  };
  let script = document.createElement('script');
  script.id = 'gamefinderExtensionScript';
  script.src = chrome.runtime.getURL("home.js");
  (document.head || document.documentElement).appendChild(script);
  script.onload = function() {
    this.remove();
  };
} else if (initialURL.includes("https://www.youtube.com/watch?v=")) {

  if (document.getElementById('gamefinderExtensionScript')) {
    document.getElementById('gamefinderExtensionScript').remove();
  };
  let script = document.createElement('script');
  script.id = 'gamefinderExtensionScript';
  script.src = chrome.runtime.getURL("recommended.js");
  (document.head || document.documentElement).appendChild(script);
  script.onload = function() {
    this.remove();
  };
}

const URLChangeChecker = () => {
  if (initialURL !== window.location.href) {
    initialURL = window.location.href;
    window.location.reload();
  }
}

const checkURLInterval = setInterval(URLChangeChecker, 300);