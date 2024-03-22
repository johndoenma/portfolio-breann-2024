const things = document.querySelectorAll(".pg-follow-cursor");
const amount = 50;

const handleMouseMove = event => {
  const mousePosX = event.clientX
  const mousePosY = event.clientY;

  things.forEach(thing => {
    const thingRect = thing.getBoundingClientRect();
    if (isOnScreen(thingRect)) {
      const centerX = thingRect.left + (thingRect.right - thingRect.left) * 0.5;
      const centerY = thingRect.top + (thingRect.bottom - thingRect.top) * 0.5;
      const distX = centerX - mousePosX;
      const distY = centerY - mousePosY;
      const xDeg = distX / amount * -1;
      const yDeg = distY / amount;
      thing.style.transform = `rotate3d(1, 0, 0, ${yDeg}deg) rotate3d(0, 1, 0, ${xDeg}deg)`;
    }
  });
};

window.addEventListener("mousemove", throttled(handleMouseMove));

function isOnScreen(rect) {
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function throttled(fn) {
  let didRequest = false;
  return param => {
    if (!didRequest) {
      window.requestAnimationFrame(() => {
        fn(param);
        didRequest = false;
      });
      didRequest = true;
    }
  };
}
