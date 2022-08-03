let button = document.getElementsById('button');
document.addEventListener('click', () => {
  console.log('hello');
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let url = new URL(tabs[0].url);
    let domain = url.hostname;
    // `domain` now has a value like 'example.com'
    console.log(domain);
  })
});