let buttonToggleList = document.querySelectorAll(".btn");
let pianoKey = document.querySelectorAll(".piano-key");
let fullScreenBtn = document.querySelector(".fullscreen");

let isFullScreen = false;
let isMouseDown = false;

const changeActive = () => {
  buttonToggleList.forEach((e) => {
    e.classList.remove("btn-active");
  });
};

const playAudio = (e) => {
  const audio = document.querySelector(`audio[data-key="${e}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
};

const mouseDown = (e) => {
  playAudio(e.target.dataset.letter);
  isMouseDown = true;
  e.target.classList.add("piano-key-active-pseudo");
  e.target.classList.add("piano-key-active");
};

const mouseUp = (e) => {
  isMouseDown = false;
  this.removeEventListener("mouseover", (e) => mouseMove(e));
  mouseOut(e);
};

const mouseMove = (e) => {
  if (isMouseDown) {
    playAudio(e.target.dataset.letter);
    e.target.classList.add("piano-key-active-pseudo");
    e.target.classList.add("piano-key-active");
  }
};

const mouseOut = (e) => {
  e.target.classList.remove("piano-key-active-pseudo");
  e.target.classList.remove("piano-key-active");
};

function activateFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen(); // W3C spec
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen(); // Firefox
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(); // Safari
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen(); // IE/Edge
  }
}

function deactivateFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

//  Changing the Notes and Letters
buttonToggleList.forEach((button) => {
  button.addEventListener("click", (e) => {
    changeActive();
    e.target.classList.add("btn-active");
    if (e.target.id === "letters") {
      pianoKey.forEach((key) => {
        if (key.dataset.letter) {
          key.setAttribute("data-active", key.dataset.letter);
        }
      });
    } else {
      pianoKey.forEach((key) => {
        if (key.dataset.note) {
          key.setAttribute("data-active", key.dataset.note);
        }
      });
    }
  });
});

//  Sound on type
window.addEventListener("keydown", (e) => {
  // get letter from the keyCode
  // reason : working on any keybord type
  let code = String.fromCharCode(e.keyCode);
  playAudio(code.toUpperCase());
  pianoKey.forEach((key) => {
    if (code === key.dataset.letter) {
      key.classList.add("piano-key-active-pseudo");
      key.classList.add("piano-key-active");
    }
  });
});

window.addEventListener("keyup", (e) => {
  pianoKey.forEach((key) => {
    key.classList.remove("piano-key-active-pseudo");
    key.classList.remove("piano-key-active");
  });
});

//  Sound on Click
pianoKey.forEach((key) => {
  key.addEventListener("mousedown", (e) => mouseDown(e));
  this.addEventListener("mouseover", (e) => mouseMove(e));
  this.addEventListener("mouseup", (e) => mouseUp(e));
  key.addEventListener("mouseout", (e) => mouseOut(e));
});

fullScreenBtn.onclick = function () {
  isFullScreen = !isFullScreen;

  if (isFullScreen) {
    activateFullscreen(document.documentElement);
  } else {
    deactivateFullscreen(document.documentElement);
  }
};
