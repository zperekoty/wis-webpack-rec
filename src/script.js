import "./index.html";
import "./styles.scss";

const track = document.querySelector(".image-track");

function handleOnMouseDown(e) {
  track.dataset.mouseDownAt = e.clientX;
}

function handleOnMouseUp(track) {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

function handleOnMove(e, track) {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    _nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(_nextPercentage, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    { transform: `translate(${nextPercentage}%, -50%)` },
    { duration: 1200, fill: "forwards" },
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      { objectPosition: `${100 + nextPercentage}% center` },
      { duration: 1200, fill: "forwards" },
    );
  }
}

window.onmousedown = (e) => handleOnMouseDown(e);

window.onmousemove = (e) => handleOnMove(e, track);

window.onmouseup = () => handleOnMouseUp(track);

window.ontouchstart = (e) => handleOnMouseDown(e.touches[0]);

window.ontouchend = (e) => handleOnMouseUp(track);

window.ontouchmove = (e) => handleOnMove(e.touches[0], track);
