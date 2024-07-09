import Pathfinding from "pathfinding";
import { shuffle2DArray, padding2DArray } from "./list-util";
import { feasiblePath } from "./pathcheak";

export class Puzzle {
  constructor(row, col, contentObj) {
    //row 和 col 为偶数
    this.row = row;
    this.col = col;
    this.eleMatrix = [];
    this.numMatrix = [];
    this.numMatrixPadding = 1;
    this.contentObj = contentObj;
    this.initPuzzle();
  }

  initPuzzle() {
    //初始化数组
    for (let i = 0; i < this.row; i++) {
      this.eleMatrix[i] = new Array(this.col).fill("");
      this.numMatrix[i] = new Array(this.col).fill(1);
    }

    //初始化元素
    this.fillEleMatrix();
    //随机化元素数组
    this.eleMatrix = shuffle2DArray(this.eleMatrix);
    //扩展numMatrix
    this.numMatrix = padding2DArray(this.numMatrix, this.numMatrixPadding);
    // console.log(this.numMatrix);
  }

  fillEleMatrix() {
    let ele = Object.keys(this.contentObj.contents);

    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col / 2; j++) {
        let randEle = ele[Math.floor(Math.random() * ele.length)];
        this.eleMatrix[i][j * 2] = randEle;
        this.eleMatrix[i][j * 2 + 1] = randEle;
      }
    }
  }

  getLeftCount() {
    let count = 0;
    for (let i = 0; i < this.numMatrix.length; i++) {
      for (let j = 0; j < this.numMatrix[0].length; j++) {
        if (this.numMatrix[i][j] == 1) {
          count++;
        }
      }
    }
    return count;
  }

  checkPath(A, B) {
    const grid = new Pathfinding.Grid(this.numMatrix);
    const begin = grid.getNodeAt(
      A[1] + this.numMatrixPadding,
      A[0] + this.numMatrixPadding
    );
    const end = grid.getNodeAt(
      B[1] + this.numMatrixPadding,
      B[0] + this.numMatrixPadding
    );
    grid.setWalkableAt(begin.x, begin.y, true);
    const path = feasiblePath(begin, end, grid);
    if (!path) grid.setWalkableAt(begin.x, begin.y, false);
    if (path) {
      this.unPaddedPath(path);
      path.unshift({ x: A[1], y: A[0] });
      path.push({ x: B[1], y: B[0] });
    }
    return path;
  }

  unPaddedPath(path) {
    path.forEach((node) => {
      node.x -= this.numMatrixPadding;
      node.y -= this.numMatrixPadding;
    });
  }

  setNumMatrixAt(x, y, num) {
    this.numMatrix[y + this.numMatrixPadding][x + this.numMatrixPadding] = num;
  }

  clearEleMatrixAt(x, y) {
    this.eleMatrix[y][x] = "";
  }

  shuffleEle() {
    this.eleMatrix = shuffle2DArray(this.eleMatrix);
  }

  getEleMatrix() {
    return this.eleMatrix;
  }

  getEleAt(x, y) {
    return {
      key: this.eleMatrix[y][x],
      value: this.contentObj.contents[this.eleMatrix[y][x]],
    };
  }

  getNumMatrix() {
    return this.numMatrix;
  }
}
