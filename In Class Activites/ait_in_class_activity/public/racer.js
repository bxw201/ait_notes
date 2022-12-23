const socket = io();

const p1 = document.querySelector(".player1");
const p2 = document.querySelector(".player2");

socket.on("emojiPositions", ({cryingPosition, screamingPosition}) => {
    p1.style.position = "relative";
    p1.style.left = cryingPosition + "px";
    p2.style.position = "relative";
    p2.style.left = screamingPosition + "px";
});

socket.on("moveScreaming", ({screamingPosition}) => {
    p2.style.position = "relative";
    p2.style.left = screamingPosition + "px";
})

socket.on("moveCrying", ({cryingPosition}) => {
    p1.style.position = "relative";
    p1.style.left = cryingPosition + "px";
})

document.querySelector(".player1Btn").addEventListener("click", () => {
    socket.emit("moveCrying");
});

document.querySelector(".player2Btn").addEventListener("click", () => {
    socket.emit("moveScreaming");
});