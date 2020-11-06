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
        if (code != 0) {
            cell.setAttribute("draggable", "true");
        }
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
        cell.addEventListener("dragstart", function() {
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
            const emptyContainer = document.querySelector('.empty')
            emptyContainer.appendChild(emptyCell)
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

        container.addEventListener("drop", function(evt) {
            if (this.classList.contains("empty")) {
                const dragging = document.querySelector(".dragging");
                this.append(dragging);
                this.classList.remove("hovered");
            }
        });
    });
};


const win = () => {


    document.addEventListener('dragend', function() {
        let cells = document.querySelectorAll('.cell');
        let currentArr = [];
        let winArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
        cells.forEach((cell) => {
            currentArr.push(cell.dataset.code);
        })

        if (currentArr.join('') == winArr.join('')) {
            document.location.reload();
            alert('ОМАЕВА МО ШИНДЕРУ')
        }



    })
}

createElements();
dragNDrop();
win()