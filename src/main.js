window.addEventListener('load', () => {
  let divMeta = document.getElementById('divMeta');
  divMeta.onselectstart = () => {
    return false;
  };
  divMeta.ondblclick = (event) => {
    event.preventDefault();
  };
  
  let cvs = document.getElementById('cvs');
  function resize() {
    cvs.width = cvs.parentElement.offsetWidth;
    cvs.height = cvs.parentElement.offsetHeight;
  }
  resize();
  let app = new Application(cvs);
  let timeout = null;
  
  window.addEventListener('resize', () => {
    app.pause();
    resize();
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      app.resize();
      app.resume();
      timeout = null;
    }, 500);
  });
  
  let divButtons = document.getElementById('divButtons');
  for (let name in APPS) {
    let src = APPS[name];
    let anchor = document.createElement('A');
    anchor.href = src;
    let button = document.createElement('BUTTON');
    button.innerText = name;
    anchor.appendChild(button);
    divButtons.appendChild(anchor);
  }
  
  let storage = new StorageHandler('local');
  let isBackgroundPaused = (storage.hasItem('paused'))
    ? storage.getItem('paused')
    : false;
  let btBackground = document.getElementById('btBackground');
  btBackground.innerText = (isBackgroundPaused)
    ? 'Resume Background'
    : 'Pause Background';
  if (!isBackgroundPaused) {
    app.resume();
  }
  btBackground.addEventListener('click', () => {
    app.isRunning = !app.isRunning;
    btBackground.innerText = (app.isRunning)
      ? 'Pause Background'
      : 'Resume Background';
    storage.setItem('paused', !app.isRunning);
  });
});

