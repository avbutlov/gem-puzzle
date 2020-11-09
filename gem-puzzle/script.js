const createElements = () => {
  const dataCodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  const dataCodesShuffled = dataCodes.sort(() => Math.random() - 0.5);
  let wrapper = document.createElement("div");
  let cell = null;
  let container = null;
  wrapper.classList.add("wrapper");
  dataCodesShuffled.forEach((code) => {
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
    wrapper.append(container);
  });

  document.body.prepend(wrapper);
};

const dragNDrop = () => {
  const containers = document.querySelectorAll(".container");
  const cells = document.querySelectorAll(".cell");
  const emptyCell = document.querySelector('[data-code="0"]');

  cells.forEach((cell) => {
    cell.addEventListener("dragstart", function () {
      setTimeout(() => {
        this.classList.add("hidden");
        this.classList.add("dragging");
      }, 0);
    });
    cell.addEventListener("dragend", function () {
      this.classList.remove("hidden");
      this.classList.remove("dragging");
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragstart", function () {
      setTimeout(() => {
        this.classList.add("empty");
        emptyCell.remove();
      }, 0);
    });

    container.addEventListener("dragend", function () {
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

    container.addEventListener("dragenter", function () {
      if (this.classList.contains("empty")) {
        this.classList.add("hovered");
      }
    });

    container.addEventListener("dragleave", function () {
      if (this.classList.contains("empty")) {
        this.classList.remove("hovered");
      }
    });

    container.addEventListener("dragover", function (evt) {
      evt.preventDefault();
    });

    container.addEventListener("drop", function (evt) {
      if (this.classList.contains("empty")) {
        const dragging = document.querySelector(".dragging");
        this.append(dragging);
        this.classList.remove("hovered");
      }
    });
  });
};

const win = () => {
  document.addEventListener("dragend", function () {
    let cells = document.querySelectorAll(".cell");
    let currentArr = [];
    let winArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    cells.forEach((cell) => {
      currentArr.push(cell.dataset.code);
    });

    if (currentArr.join("") == winArr.join("")) {
      document.location.reload();
      alert("ОМАЕВА МО ШИНДЕРУ");
    }
  });
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
    cell.addEventListener("click", function () {
      // смотрим только на те контейнеры которые дрэггэбл
      if (cell.getAttribute("draggable") == "true") {
        emptyContainer = document.querySelector(".empty");
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
        emptyCell.remove();
        // убираем с нынешней пустой клетки класс обычной пустой клетки и добавляем класс временной пустой клетки (вот это я придумал, конечно)
        emptyContainer.classList.remove("empty");
        emptyContainer.classList.add("empty-temporal");
        // на ту клетку с которой двигалась ячейка по клику вешаем класс обычной пустой клетки
        cell.closest(".container").classList.add("empty");
      }
    });

    cell.addEventListener("transitionend", function () {
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
    });
  });
};

createElements();
dragNDrop();
win();
onClickTranslate();
window.addEventListener("load", getNearest);
window.addEventListener("dragend", getNearest);

// здесь вешаем слушатель именно на клетки из-за того, что транзишн есть еще во время дрэг эгд дропа и он висит на контейнерах и из-за этого могут некоторые проблемы возникать
let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("transitionend", getNearest);
});
