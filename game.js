
const note = document.getElementById("note");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const message = document.getElementById("message");

const startButton = document.getElementById("startButton");
const tapButton = document.getElementById("tapButton");

let score = 0;
let time = 20;
let isPlaying = false;
let canTap = false;

let beatTimer = null;
let gameTimer = null;
let beatTimeout = null;
let beatUsed = false;

// 丸を光らせる
function showBeat() {
  if (!isPlaying) return;

  canTap = true;
  beatUsed = false;

  note.classList.add("on");

  clearTimeout(beatTimeout);

  beatTimeout = setTimeout(() => {
    note.classList.remove("on");
    canTap = false;

    if (isPlaying && !beatUsed) {
      message.textContent = "おしい！次の光を待とう";
    }
  }, 600);
}

// ゲームを開始する
function startGame() {
  if (isPlaying) return;

  score = 0;
  time = 20;
  isPlaying = true;

  scoreText.textContent = score;
  timeText.textContent = time;

  message.textContent = "光ったらタップ！";

  startButton.disabled = true;
  tapButton.disabled = false;

  showBeat();

  beatTimer = setInterval(showBeat, 1000);

  gameTimer = setInterval(() => {
    time--;
    timeText.textContent = time;

    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

// タップしたときの処理
function tap() {
  if (!isPlaying) return;

  if (canTap && !beatUsed) {
    score++;

    scoreText.textContent = score;

    beatUsed = true;
    canTap = false;

    note.classList.remove("on");

    message.textContent = "ナイス！";
  } else {
    message.textContent = "丸が光ったときに押してね";
  }
}

// ゲームを終了する
function endGame() {
  isPlaying = false;
  canTap = false;

  clearInterval(beatTimer);
  clearInterval(gameTimer);
  clearTimeout(beatTimeout);

  note.classList.remove("on");

  tapButton.disabled = true;
  startButton.disabled = false;

  message.textContent =
    "終了！スコアは " + score + " 点です。もう一度遊べるよ！";
}

// ボタンの動きを設定
startButton.addEventListener("click", startGame);
tapButton.addEventListener("click", tap);

// スペースキーでも遊べる
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && isPlaying) {
    event.preventDefault();
    tap();
  }
});
