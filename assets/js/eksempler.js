var rooms = {};
rooms.opacityIn = [0,1];
rooms.scaleIn = [0.2, 1];
rooms.scaleOut = 3;
rooms.durationIn = 800;
rooms.durationOut = 600;
rooms.delay = 500;

anime.timeline({loop: true})
  .add({
    targets: '.rooms .letters-1',
    opacity: rooms.opacityIn,
    scale: rooms.scaleIn,
    duration: rooms.durationIn
  }).add({
    targets: '.rooms .letters-1',
    opacity: 0,
    scale: rooms.scaleOut,
    duration: rooms.durationOut,
    easing: "easeInExpo",
    delay: rooms.delay
  }).add({
    targets: '.rooms .letters-2',
    opacity: rooms.opacityIn,
    scale: rooms.scaleIn,
    duration: rooms.durationIn
  }).add({
    targets: '.rooms .letters-2',
    opacity: 0,
    scale: rooms.scaleOut,
    duration: rooms.durationOut,
    easing: "easeInExpo",
    delay: rooms.delay
  }).add({
    targets: '.rooms .letters-3',
    opacity: rooms.opacityIn,
    scale: rooms.scaleIn,
    duration: rooms.durationIn
  }).add({
    targets: '.rooms .letters-3',
    opacity: 0,
    scale: rooms.scaleOut,
    duration: rooms.durationOut,
    easing: "easeInExpo",
    delay: rooms.delay
  }).add({
    targets: '.rooms',
    opacity: 0,
    duration: 500,
    delay: 500
  });