import { Puzzle } from "./puzzle";
import { drawPath, clearPath } from "./drawpath";

export class Board {
  constructor(row, col, contentObj, tileWidth = 100, tileHeight = 100) {
    this.row = row;
    this.col = col;
    this.contentObj = contentObj;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.puzzle = new Puzzle(row, col, contentObj);

    this.tileMatrix = [];
    this.selectedTiles = [];
  }

  reloadPuzzle() {
    this.puzzle = new Puzzle(this.row, this.col, this.contentObj);
    this.tileMatrix = [];
    this.selectedTiles = [];
    this.initBoard();
  }

  setContentAndReloadBoard(contentRes) {
    this.contentObj = contentRes;
    this.reloadPuzzle();
  }

  initBoard() {
    const gameBoard = document.getElementById("game-board");

    for (let i = 0; i < this.row; i++) {
      this.tileMatrix.push([]);
      for (let j = 0; j < this.col; j++) {
        const tile = document.createElement("div");
        tile.classList.add("tile", "container");

        this.insertImg(tile, this.puzzle.getEleAt(j, i).value);
        tile.dataset.row = i;
        tile.dataset.col = j;
        tile.dataset.key = this.puzzle.getEleAt(j, i).key;
        // tile.style.backgroundColor = "#485675";
        tile.addEventListener("click", () => this.selectTile(tile));
        gameBoard.appendChild(tile);
        this.tileMatrix[i].push(tile);
      }
    }
  }

  insertImg(element, url) {
    const img = document.createElement("img");
    img.src = url;
    element.appendChild(img);
  }

  selectTile(tile) {
    if (tile.classList.contains("empty")) {
      return; // 忽略空白格子
    }

    if (this.selectedTiles.includes(tile)) {
      // 如果点击已选中的 tile，取消选中
      tile.classList.remove("selected");
      this.electedTiles = this.selectedTiles.filter((t) => t !== tile);
    } else {
      // 选中新的 tile
      tile.classList.add("selected");
      this.selectedTiles.push(tile);

      // 如果已选中两个 tile，检查是否可以消除
      if (this.selectedTiles.length === 2) {
        this.checkMatch();
      }
    }
  }

  checkMatch() {
    const [tile1, tile2] = this.selectedTiles;

    // 检查两个 tile 是否颜色相同
    if (tile1.dataset.key === tile2.dataset.key) {
      // 检查是否有有效路径（这里需要你实现 findPath 函数）
      const path = this.findPath(
        [parseInt(tile1.dataset.row), parseInt(tile1.dataset.col)],
        [parseInt(tile2.dataset.row), parseInt(tile2.dataset.col)]
      );
      if (path) {
        // 如果有有效路径，消除这两个 tile
        drawPath(path);
        this.removeTiles(tile1, tile2);
        setTimeout(() => {
          clearPath();
          this.checkGameState();
        }, 500);
      } else {
        // 如果没有有效路径，取消选中
        this.deselectTiles();
      }
    } else {
      // 如果颜色不同，取消选中
      this.deselectTiles();
    }
  }

  removeTiles(tile1, tile2) {
    [tile1, tile2].forEach((tile) => {
      const row = parseInt(tile.dataset.row);
      const col = parseInt(tile.dataset.col);
      tile.classList.add("empty");

      tile.classList.add("disappearing");
      this.puzzle.setNumMatrixAt(col, row, 0);
      this.puzzle.clearEleMatrixAt(col, row);
      //tileMatrix 对应位置置空
      this.tileMatrix[row][col] = null;
    });
    this.selectedTiles = [];
  }

  deselectTiles() {
    this.selectedTiles.forEach((tile) => tile.classList.remove("selected"));
    this.selectedTiles = [];
  }

  getPuzzle() {
    return this.puzzle;
  }

  checkGameState() {
    // 检查是否还有可以匹配的 tile
    // 如果没有，游戏结束
    // 这个函数的具体实现取决于你的游戏规则
  }

  // 假设的 findPath 函数
  findPath(start, end) {
    return this.puzzle.checkPath(start, end);
  }
}
