const createArray = (n) => {
    const dataCodes = [];
    for (let i = 1; i < n; i++) {
        dataCodes.push(i);
    }
    dataCodes.push(0);
    return dataCodes;
};

const createElements = (seq, columns) => {
    let timer = document.createElement("div");
    let counter = document.createElement("div");
    let save = document.createElement("div");
    let reload = document.createElement("div");
    let gameInfo = document.createElement("div");
    let puzzleBoard = document.createElement("div");
    let wrapper = document.createElement("div");
    let controlPanel = document.createElement("div");
    const cellAudio = document.createElement("audio");
    const dragAudio = document.createElement("audio");
    let cell = null;
    let container = null;
    puzzleBoard.classList.add("puzzle-board");
    wrapper.classList.add("wrapper");
    gameInfo.classList.add("game-info");
    counter.classList.add("counter", "info-item");
    timer.classList.add("timer", "info-item");
    controlPanel.classList.add("control-panel");
    save.classList.add("save", "btn");
    reload.classList.add("reload", "btn");
    cellAudio.classList.add("cell-audio");
    dragAudio.classList.add("drag-audio");
    cellAudio.setAttribute(
        "src",
        "looperman-l-3210323-0229772-more-8-bit-shit (mp3cut.net).wav"
    );
    dragAudio.setAttribute(
        "src",
        "looperman-l-1668761-0230739-pyrex-type-loop-flip (mp3cut.net).wav"
    );

    timer.textContent = "00:00";
    save.textContent = "save";
    reload.textContent = "reload";
    seq.forEach((code) => {
        cell = document.createElement("div");
        container = document.createElement("div");
        cell.innerHTML = code;
        cell.dataset.code = code;
        if (code == 0) {
            container.classList.add("empty");
        }
        container.append(cell);
        cell.classList.add("cell");
        container.classList.add("container");
        puzzleBoard.append(container);
    });

    document.body.prepend(wrapper);
    wrapper.append(gameInfo);
    wrapper.append(puzzleBoard);
    wrapper.append(controlPanel);
    gameInfo.append(timer);
    gameInfo.append(counter);
    controlPanel.append(save);
    controlPanel.append(reload);
    wrapper.append(cellAudio);
    wrapper.append(dragAudio);

    puzzleBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
};

const dragNDrop = () => {
    const containers = document.querySelectorAll(".container");
    const cells = document.querySelectorAll(".cell");
    const emptyCell = document.querySelector('[data-code="0"]');
    let counter = document.querySelector(".counter");
    const dragAudio = document.querySelector(".drag-audio");
    counter.innerHTML = counter.innerHTML || 0;

    cells.forEach((cell) => {
        cell.addEventListener("dragstart", function(evt) {
            setTimeout(() => {
                this.classList.add("hidden");
                this.classList.add("dragging");
            }, 0);
        });
        cell.addEventListener("dragend", function() {
            this.classList.remove("hidden");
            this.classList.remove("dragging");
        });
    });

    containers.forEach((container) => {
        container.addEventListener("dragstart", function() {
            setTimeout(() => {
                this.classList.add("empty");
                emptyCell.remove();
            }, 0);
        });

        container.addEventListener("dragend", function() {
            this.classList.remove("empty");
            const emptyContainer = document.querySelector(".empty");
            emptyContainer.appendChild(emptyCell);

            let cells = document.querySelectorAll(".cell");
            let currentArr = [];
            cells.forEach((cell) => {
                currentArr.push(cell.dataset.code);
            });

            /*

        if (container.getBoundingClientRect().x - 120 == emptyContainer.getBoundingClientRect().x || container.getBoundingClientRect().x + 120 == emptyContainer.getBoundingClientRect().x) {
         
         if (container.getBoundingClientRect().y + 120 != emptyContainer.getBoundingClientRect().y && container.getBoundingClientRect().y - 120 != emptyContainer.getBoundingClientRect().y) {
           if (Math.abs(container.getBoundingClientRect().x - emptyContainer.getBoundingClientRect().x) == 120 && Math.abs(container.getBoundingClientRect().y - emptyContainer.getBoundingClientRect().y) == 0) {
          console.log('hordraggable')
           }
         }
        }

        if (container.getBoundingClientRect().y - 120 == emptyContainer.getBoundingClientRect().y || container.getBoundingClientRect().y + 120 == emptyContainer.getBoundingClientRect().y) {
         
          if (container.getBoundingClientRect().x + 120 != emptyContainer.getBoundingClientRect().x && container.getBoundingClientRect().x - 120 != emptyContainer.getBoundingClientRect().x) {
            if (Math.abs(container.getBoundingClientRect().y - emptyContainer.getBoundingClientRect().y) == 120 && Math.abs(container.getBoundingClientRect().x - emptyContainer.getBoundingClientRect().x) == 0) {
           console.log('verdraggable')
            }
          }
         }


      if (
        (container.getBoundingClientRect().x - 120 ==
          emptyContainer.getBoundingClientRect().x ||
        container.getBoundingClientRect().x + 120 ==
          emptyContainer.getBoundingClientRect().x) &&
          container.getBoundingClientRect().y + 120 !=
            emptyContainer.getBoundingClientRect().y &&
          container.getBoundingClientRect().y - 120 !=
            emptyContainer.getBoundingClientRect().y &&
          Math.abs(
            container.getBoundingClientRect().x -
              emptyContainer.getBoundingClientRect().x
          ) == 120 &&
          Math.abs(
            container.getBoundingClientRect().y -
              emptyContainer.getBoundingClientRect().y
          ) == 0
      ) {
        console.log("hor");
      } else if (
        (container.getBoundingClientRect().y - 120 ==
          emptyContainer.getBoundingClientRect().y ||
        container.getBoundingClientRect().y + 120 ==
          emptyContainer.getBoundingClientRect().y) &&
          container.getBoundingClientRect().x + 120 !=
            emptyContainer.getBoundingClientRect().x &&
          container.getBoundingClientRect().x - 120 !=
            emptyContainer.getBoundingClientRect().x &&
          Math.abs(
            container.getBoundingClientRect().y -
              emptyContainer.getBoundingClientRect().y
          ) == 120 &&
          Math.abs(
            container.getBoundingClientRect().x -
              emptyContainer.getBoundingClientRect().x
          ) == 0
      ) {
        console.log('ver')
      } else {
        console.log('no')
      }

*/
        });

        container.addEventListener("dragenter", function() {
            if (this.classList.contains("empty")) {
                this.classList.add("hovered");
            }
        });

        container.addEventListener("dragleave", function() {
            if (this.classList.contains("empty")) {
                this.classList.remove("hovered");
            }
        });

        container.addEventListener("dragover", function(evt) {
            evt.preventDefault();
        });

        container.addEventListener("drop", function() {
            if (this.classList.contains("empty")) {
                dragAudio.play();
                const dragging = document.querySelector(".dragging");
                this.append(dragging);
                this.classList.remove("hovered");
                counter.innerHTML = Number(counter.innerHTML) + 1;
            }
        });
    });
};

const win = () => {
    setTimeout(() => {
        let cells = document.querySelectorAll(".cell");
        let currentArr = [];
        let winArr = createArray(Number(window.localStorage.getItem("cells")));
        cells.forEach((cell) => {
            currentArr.push(cell.dataset.code);
        });

        if (currentArr.join("") == winArr.join("")) {
            document.location.reload();
            alert("ОМАЕВА МО ШИНДЕРУ");
        }
    }, 500);
};

const getNearest = () => {
    const emptyContainer = document.querySelector(".empty");
    const containers = document.querySelectorAll(".container");

    containers.forEach((container) => {
        // поиск горизонтальных ячеек поблизости
        if (
            (container.getBoundingClientRect().x - 120 ==
                emptyContainer.getBoundingClientRect().x ||
                container.getBoundingClientRect().x + 120 ==
                emptyContainer.getBoundingClientRect().x) &&
            container.getBoundingClientRect().y + 120 !=
            emptyContainer.getBoundingClientRect().y &&
            container.getBoundingClientRect().y - 120 !=
            emptyContainer.getBoundingClientRect().y &&
            Math.abs(
                container.getBoundingClientRect().x -
                emptyContainer.getBoundingClientRect().x
            ) == 120 &&
            Math.abs(
                container.getBoundingClientRect().y -
                emptyContainer.getBoundingClientRect().y
            ) == 0
        ) {
            container.querySelector(".cell").setAttribute("draggable", "true");
            container.classList.add("container-draggable");
        } else if (
            // поиск вертикальных ячеек поблизости
            (container.getBoundingClientRect().y - 120 ==
                emptyContainer.getBoundingClientRect().y ||
                container.getBoundingClientRect().y + 120 ==
                emptyContainer.getBoundingClientRect().y) &&
            container.getBoundingClientRect().x + 120 !=
            emptyContainer.getBoundingClientRect().x &&
            container.getBoundingClientRect().x - 120 !=
            emptyContainer.getBoundingClientRect().x &&
            Math.abs(
                container.getBoundingClientRect().y -
                emptyContainer.getBoundingClientRect().y
            ) == 120 &&
            Math.abs(
                container.getBoundingClientRect().x -
                emptyContainer.getBoundingClientRect().x
            ) == 0
        ) {
            container.querySelector(".cell").setAttribute("draggable", "true");
            container.classList.add("container-draggable");
        } else {
            container.querySelector(".cell").setAttribute("draggable", "false");

            container.classList.remove("container-draggable");
        }
    });
};

const onClickTranslate = () => {
    const cells = document.querySelectorAll(".cell");
    const emptyCell = document.querySelector('[data-code="0"]');
    let emptyContainer = document.querySelector(".empty");
    let counter = document.querySelector(".counter");
    const cellAudio = document.querySelector(".cell-audio");
    counter.innerHTML = counter.innerHTML || 0;

    /*

            containers.forEach((container) => {
              container.addEventListener("click", function () {
                  if (container.querySelector('.cell').getAttribute("draggable") == "true") {
                if (
                  this.getBoundingClientRect().x - 120 ==
                  emptyContainer.getBoundingClientRect().x
                ) {
                  this.querySelector(".cell").style.transform = "translateX(-120%)";
                  console.log(this.querySelector(".cell").getBoundingClientRect());
                  console.log(emptyContainer.getBoundingClientRect());
                } else if (
                  this.getBoundingClientRect().x + 120 ==
                  emptyContainer.getBoundingClientRect().x
                ) {
                  this.querySelector(".cell").style.transform = "translateX(120%)";
                } else if (
                  this.getBoundingClientRect().y - 120 ==
                  emptyContainer.getBoundingClientRect().y
                ) {
                  this.querySelector(".cell").style.transform = "translateY(-120%)";
                } else {
                  this.querySelector(".cell").style.transform = "translateY(120%)";
                }
              }
              });
            });

            */

    cells.forEach((cell) => {
        cell.addEventListener("click", function() {
            // смотрим только на те контейнеры которые дрэггэбл
            if (cell.getAttribute("draggable") == "true" && !cell.classList.contains("empty-temporal") && !cell.classList.contains("empty")) {
                cellAudio.play();
                cellAudio.volume = 0.3;
                cellAudio.currentTime = 0;
                emptyContainer = document.querySelector(".empty");
                emptyCell.remove();
                // убираем с нынешней пустой клетки класс обычной пустой клетки и добавляем класс временной пустой клетки (вот это я придумал, конечно)
                emptyContainer.classList.remove("empty");
                emptyContainer.classList.add("empty-temporal");
                // на ту клетку с которой двигалась ячейка по клику вешаем класс обычной пустой клетки
                cell.closest(".container").classList.add("empty");
                // определяем в какую сторону будем двигать клетку (и все это ради какой-то анимации, ужас)
                if (
                    this.closest(".container").getBoundingClientRect().x - 120 ==
                    emptyContainer.getBoundingClientRect().x
                ) {
                    this.style.transform = "translateX(-120%)";
                } else if (
                    this.closest(".container").getBoundingClientRect().x + 120 ==
                    emptyContainer.getBoundingClientRect().x
                ) {
                    this.style.transform = "translateX(120%)";
                } else if (
                    this.closest(".container").getBoundingClientRect().y - 120 ==
                    emptyContainer.getBoundingClientRect().y
                ) {
                    this.style.transform = "translateY(-120%)";
                } else {
                    this.style.transform = "translateY(120%)";
                }
            }
        });

        cell.addEventListener("transitionend", function() {
            // заново определяем пустую клетку, потому что ее значение ведь изменилось при клике, теперь она там где раньше была ячейка
            const emptyContainer = document.querySelector(".empty");
            const emptyTemporal = document.querySelector(".empty-temporal");
            // добавляем в нашу бывшую пустую клетку передвигаемую ячейку
            emptyTemporal.appendChild(cell);
            emptyContainer.append(emptyCell);
            // это чтобы ячейка не убегала никуда
            cell.style.transform = "translateY(0)";
            // снимаем с той клетки на которую передвинули ячейку класс временно пустой, она ведь больше не пустая
            emptyTemporal.classList.remove("empty-temporal");
            counter.innerHTML = Number(counter.innerHTML) + 1;
        });
    });
};

// таймер

const createTimer = function(curTime) {
    let timer = document.querySelector(".timer");
    let saveGame = document.querySelector(".save");
    let load = document.querySelectorAll(".load");
    let time = curTime;
    let watch = new Stopwatch(timer);

    function Stopwatch(el) {
        let interval;
        let offset;

        function update() {
            time += delta();
            let formattedTime = timeFormatter(time);
            el.textContent = formattedTime;
        }

        this.save = function() {
            window.localStorage.setItem("time", time);
        };

        function delta() {
            let now = Date.now();
            let timePassed = now - offset;
            offset = now;
            return timePassed;
        }

        function timeFormatter(timeInMilliseconds) {
            let time = new Date(timeInMilliseconds);

            let minutes = time.getMinutes().toString();
            let seconds = time.getSeconds().toString();

            if (minutes.length < 2) {
                minutes = `0${minutes}`;
            }

            if (seconds.length < 2) {
                seconds = `0${seconds}`;
            }
            return `${minutes}:${seconds}`;
        }

        this.isOn = false;

        this.start = function() {
            if (!this.isOn) {
                interval = setInterval(update, 1000);
                offset = Date.now();
                this.isOn = true;
            }
        };
        this.stop = function() {
            if (this.isOn) {
                clearInterval(interval);
                interval = null;
                this.isOn = false;
            }
        };
        this.reset = function() {
            time = 0;
        };
    }

    window.addEventListener("dragstart", function() {
        watch.start();
    });

    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("click", function() {
            watch.start();
        });
    });

    saveGame.addEventListener("click", function() {
        watch.save();
    });
};

const reloadGame = () => {
    const reload = document.querySelector(".reload");
    const wrapper = document.querySelector(".wrapper");

    reload.addEventListener("click", function() {
        wrapper.remove();
        createElements(
            createArray(Number(window.localStorage.getItem("cells"))).sort(
                () => Math.random() - 0.5
            ),
            Math.sqrt(Number(window.localStorage.getItem("cells")))
        );
        getNearest();
        dragNDrop();
        document.addEventListener("dragend", win);
        onClickTranslate();
        createTimer(0);
        reloadGame();
        saveGame();
        let time = 0;
        let cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", win);
            cell.addEventListener("transitionend", getNearest);
        });
    });
};

const saveGame = () => {
    const timer = document.querySelector(".timer");
    const counter = document.querySelector(".counter");
    const save = document.querySelector(".save");

    save.addEventListener("click", function() {
        let cells = document.querySelectorAll(".cell");
        let currentArr = [];
        cells.forEach((cell) => {
            currentArr.push(cell.dataset.code);
        });
        window.localStorage.setItem("currSeq", currentArr);
        window.localStorage.setItem("counter", counter.innerHTML);
        window.localStorage.setItem("outerTime", timer.innerHTML);
    });
};

const createStartScreen = () => {
    const startGame = document.createElement("div");
    const startWrapper = document.createElement("div");
    const newGame = document.createElement("div");
    const loadGame = document.createElement("div");
    const settingsBtn = document.createElement("div");
    const scoreBtn = document.createElement("div");
    const settingsWrapper = document.createElement("div");
    const popup = document.createElement("div");
    const audio = document.createElement("audio");
    const gameModeList = document.createElement("ul");
    const easy = document.createElement("li");
    const normal = document.createElement("li");
    const medium = document.createElement("li");
    const hard = document.createElement("li");
    const insane = document.createElement("li");
    const nightmare = document.createElement("li");
    const settingsNames = document.createElement("ul");
    const settingSound = document.createElement('li');
    const settingMusic = document.createElement("li");
    const settingCells = document.createElement("li");
    const settingsValues = document.createElement("ul");
    const soundValue = document.createElement("li");
    const musicValue = document.createElement("li");
    const cellsValue = document.createElement("li");

    startWrapper.classList.add('start-wrapper')
    startGame.classList.add("start-game");
    newGame.classList.add("new-game", "btn");
    loadGame.classList.add("load-game", "btn");
    settingsBtn.classList.add("settings-button", "btn");
    scoreBtn.classList.add("score-button", "btn");
    popup.classList.add("popup");
    gameModeList.classList.add("game-mode");
    easy.classList.add("mode", "easy", "btn");
    normal.classList.add("mode", "normal", "btn");
    hard.classList.add("mode", "hard", "btn");
    medium.classList.add("mode", "medium", "btn");
    insane.classList.add("mode", "insane", "btn");
    nightmare.classList.add("mode", "nightmare", "btn");
    audio.classList.add("theme-audio");
    settingsWrapper.classList.add("settings-wrapper");
    settingsNames.classList.add("settings-names");
    settingSound.classList.add("setting-sound", "info-item");
    settingMusic.classList.add("setting-music", "info-item");
    settingCells.classList.add("setting-cells", "info-item");
    settingsValues.classList.add("settings-values");
    soundValue.classList.add("sound-value", "btn");
    musicValue.classList.add("music-value", "btn");
    cellsValue.classList.add("cells-value", "btn");


    easy.dataset.mode = 9;
    normal.dataset.mode = 16;
    medium.dataset.mode = 25;
    hard.dataset.mode = 36;
    insane.dataset.mode = 49;
    nightmare.dataset.mode = 64;
    audio.setAttribute(
        "src",
        "Electric_Youth_-_Where_Did_You_Go_(ru.muzikavsem.org).mp3"
    );

    newGame.innerHTML = "new game";
    loadGame.innerHTML = "load game";
    settingsBtn.textContent = "settings";
    scoreBtn.textContent = "top score"
    easy.textContent = "easy";
    normal.textContent = "normal";
    medium.textContent = "medium";
    hard.textContent = "hard";
    insane.textContent = "insane";
    nightmare.textContent = "nightmare";
    settingSound.textContent = "sounds";
    settingMusic.textContent = "music";
    settingCells.innerHTML = "cells<br/> style";
    soundValue.textContent = window.localStorage.getItem("sound") || "yes";
    musicValue.textContent = window.localStorage.getItem("music") || "yes";
    cellsValue.textContent = window.localStorage.getItem("cellsStyle") || "numbers";

    let popupText =
        "Sorry, but you haven't got saved game yet. Please, start new game";

    let i = 0;

    function typeWriter() {
        if (i < popupText.length) {
            popup.innerHTML += popupText.charAt(i);
            i++;
            setTimeout(typeWriter, 70);
        } else {
            setTimeout(() => {
                i = 0;
                popup.innerHTML = "";
            }, 1000);
        }
    }


    settingsValues.addEventListener("click", function(e) {
        if (e.target === soundValue) {
            if (soundValue.textContent === "yes") {
                soundValue.textContent = 'no';

            } else {
                soundValue.textContent = 'yes';
            }
        } else if (e.target === musicValue) {
            if (musicValue.textContent === "yes") {
                musicValue.textContent = 'no';

            } else {
                musicValue.textContent = 'yes';
            }
        } else if (e.target === cellsValue) {
            if (cellsValue.textContent === "numbers") {
                cellsValue.textContent = 'pictures';

            } else {
                cellsValue.textContent = 'numbers';
            }
        }

        window.localStorage.setItem("sound", `${soundValue.textContent}`)
        window.localStorage.setItem("music", `${musicValue.textContent}`)
        window.localStorage.setItem("cellsStyle", `${cellsValue.innerHTML}`)
    })




    if (
        window.localStorage.getItem("time") == 0 ||
        !window.localStorage.getItem("time")
    ) {
        loadGame.addEventListener("click", typeWriter);
    } else {
        loadGame.addEventListener("click", function() {
            audio.play();
            audio.volume = 0.1;
            audio.loop = true;
        });
    }

    newGame.addEventListener("click", function() {
        audio.play();
        audio.volume = 0.1;
        audio.loop = true;
    });

    settingsBtn.addEventListener("click", closeStartMenu);





    document.body.prepend(startWrapper);
    startWrapper.append(startGame)
    startGame.append(newGame);
    startGame.append(loadGame);
    startWrapper.append(settingsBtn);
    startWrapper.append(scoreBtn)
    document.body.prepend(popup);
    document.body.append(audio);
    document.body.append(gameModeList);
    gameModeList.appendChild(easy);
    gameModeList.appendChild(normal);
    gameModeList.appendChild(medium);
    gameModeList.appendChild(hard);
    gameModeList.appendChild(insane);
    gameModeList.appendChild(nightmare);
    document.body.append(settingsWrapper);
    settingsWrapper.appendChild(settingsNames);
    settingsWrapper.appendChild(settingsValues);
    settingsNames.appendChild(settingSound);
    settingsNames.appendChild(settingMusic);
    settingsNames.appendChild(settingCells);
    settingsValues.appendChild(soundValue);
    settingsValues.appendChild(musicValue);
    settingsValues.appendChild(cellsValue);
};

const goToMenu = function(e) {
    let wrapper = document.querySelector(".wrapper");
    let audio = document.querySelector(".theme-audio");
    const gameModeList = document.querySelector(".game-mode");
    const startWrapper = document.querySelector(".start-wrapper");
    const popup = document.querySelector(".popup");
    const settingsWrapper = document.querySelector(".settings-wrapper");
    if (e.code == "Escape") {
        if (wrapper) {
            wrapper.remove();
            audio.remove();
            createStartScreen();
            startGame();
            console.log(wrapper)
        }
        if (gameModeList && gameModeList.classList.contains("visible")) {
            gameModeList.classList.remove("visible");
            startWrapper.classList.remove("hidden");
            popup.classList.remove("hidden");

        }

        if (settingsWrapper && settingsWrapper.classList.contains("visible-settings")) {
            settingsWrapper.classList.remove("visible-settings");
            startWrapper.classList.remove("hidden");
            popup.classList.remove("hidden");
        }


    }
};

const closeStartMenu = function() {
    const startWrapper = document.querySelector(".start-wrapper");
    const popup = document.querySelector(".popup");
    const gameModeList = document.querySelector(".game-mode");
    const settingsBtn = document.querySelector(".settings-button")
    const newGame = document.querySelector(".new-game");
    const settingsWrapper = document.querySelector(".settings-wrapper");
    startWrapper.classList.add("hidden");
    popup.classList.add("hidden");
    if (this === newGame) {
        gameModeList.classList.add("visible");
    } else if (this === settingsBtn) {
        settingsWrapper.classList.add("visible-settings");
    }

}

const startGame = () => {
    const newGame = document.querySelector(".new-game");
    const startWrapper = document.querySelector(".start-wrapper");
    const loadGame = document.querySelector(".load-game");
    const popup = document.querySelector(".popup");
    const gameModeList = document.querySelector(".game-mode");
    const gameModes = document.querySelectorAll(".mode");
    const puzzleBoard = document.querySelector(".puzzle-board");
    const settingsWrapper = document.querySelector(".settings-wrapper");


    let loadedDataCodes = window.localStorage.getItem("currSeq");
    const start = function() {
        /*
    gameModes.forEach((gameMode) => {
      gameMode.addEventListener('click', function () {
      window.localStorage.setItem("time", 0);
      createElements(createArray(16));
      createTimer(0);
      })
  })

  */

        if (this === loadGame) {
            loadedDataCodes = loadedDataCodes.split(",");
            createElements(
                loadedDataCodes,
                Math.sqrt(Number(window.localStorage.getItem("cells")))
            );
            let timer = document.querySelector(".timer");
            let counter = document.querySelector(".counter");

            timer.innerHTML = window.localStorage.getItem("outerTime");
            counter.innerHTML = window.localStorage.getItem("counter");
            createTimer(Number(window.localStorage.getItem("time")));
        }

        startWrapper.remove();
        settingsWrapper.remove();
        popup.remove();
        gameModeList.remove();

        getNearest();
        dragNDrop();
        document.addEventListener("dragend", win);

        onClickTranslate();
        reloadGame();
        saveGame();

        let cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("transitionend", getNearest);
            cell.addEventListener("click", win);
        });
        window.addEventListener("dragend", getNearest);
    };

    newGame.addEventListener("click", closeStartMenu);

    gameModes.forEach((gameMode) => {
        gameMode.addEventListener("click", function() {
            window.localStorage.setItem("time", 0);
            createElements(
                createArray(Number(gameMode.dataset.mode)).sort(
                    () => Math.random() - 0.5
                ),
                Math.sqrt(Number(gameMode.dataset.mode))
            );
            window.localStorage.setItem("cells", gameMode.dataset.mode);
            createTimer(0);
            start();
        });
    });


    if (
        window.localStorage.getItem("time") &&
        window.localStorage.getItem("time") != 0
    ) {
        loadGame.addEventListener("click", start);
    }
};



//

/*
createElements();
dragNDrop();
win();
onClickTranslate();
createTimer();
reloadGame();
getNearest();
window.addEventListener("dragend", getNearest);

// здесь вешаем слушатель именно на клетки из-за того, что транзишн есть еще во время дрэг эгд дропа и он висит на контейнерах и из-за этого могут некоторые проблемы возникать
let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
    cell.addEventListener("transitionend", getNearest);
});

*/
createStartScreen();
startGame();
window.addEventListener("keydown", goToMenu);