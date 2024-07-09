import { drawPath, clearPath } from "./src/drawpath";
import { Board } from "./src/board";
import { colorRes, spriteRes, dsSpriteRes } from "./src/res";

const gameBoard = document.getElementById("game-board");
const colors = [
  "#FFB3BA",
  "#BAFFC9",
  "#BAE1FF",
  "#FFFFBA",
  "#FFDFBA",
  "#E0BBE4",
  "#D4F0F0",
  "#FFC6FF",
];

const board = new Board(10, 10, dsSpriteRes, 80, 80);
board.initBoard();

// let selectedTiles = [];

// function createGameBoard() {
//   for (let row = 0; row < 10; row++) {
//     for (let col = 0; col < 10; col++) {
//       const tile = document.createElement("div");
//       tile.classList.add("tile");
//       tile.dataset.row = row;
//       tile.dataset.col = col;
//       tile.style.backgroundColor =
//         colors[Math.floor(Math.random() * colors.length)];
//       tile.addEventListener("click", () => selectTile(tile));
//       gameBoard.appendChild(tile);
//     }
//   }
// }

// function selectTile(tile) {
//   if (selectedTiles.includes(tile)) {
//     // 如果点击已选中的 tile，取消选中
//     tile.classList.remove("selected");
//     selectedTiles = selectedTiles.filter((t) => t !== tile);
//   } else {
//     // 选中新的 tile
//     tile.classList.add("selected");
//     selectedTiles.push(tile);

//     // 如果已选中两个 tile，检查是否可以消除
//     if (selectedTiles.length === 2) {
//       checkMatch();
//     }
//   }
// }

// function checkMatch() {
//   const [tile1, tile2] = selectedTiles;

//   // 检查两个 tile 是否颜色相同
//   if (tile1.style.backgroundColor === tile2.style.backgroundColor) {
//     // 检查是否有有效路径（这里需要你实现 findPath 函数）
//     const path = findPath(
//       [parseInt(tile1.dataset.row), parseInt(tile1.dataset.col)],
//       [parseInt(tile2.dataset.row), parseInt(tile2.dataset.col)]
//     );

//     if (path) {
//       // 如果有有效路径，消除这两个 tile
//       removeTiles(tile1, tile2);
//       drawPath(path);
//       setTimeout(() => {
//         clearPath();
//         checkGameState();
//       }, 500);
//     } else {
//       // 如果没有有效路径，取消选中
//       deselectTiles();
//     }
//   } else {
//     // 如果颜色不同，取消选中
//     deselectTiles();
//   }
// }

// function removeTiles(tile1, tile2) {
//   [tile1, tile2].forEach((tile) => {
//     tile.classList.add("disappearing");
//     tile.addEventListener(
//       "animationend",
//       () => {
//         tile.remove();
//       },
//       { once: true }
//     );
//   });
//   selectedTiles = [];
// }

// function deselectTiles() {
//   selectedTiles.forEach((tile) => tile.classList.remove("selected"));
//   selectedTiles = [];
// }

// function checkGameState() {
//   // 检查是否还有可以匹配的 tile
//   // 如果没有，游戏结束
//   // 这个函数的具体实现取决于你的游戏规则
// }

// // 假设的 findPath 函数
// function findPath(start, end) {
//   // 这里应该实现你的寻路算法
//   // 返回一个有效路径，或者 null 如果没有找到路径
// }

// // function findPath(startTile, endTile) {
// //   // 这里应该是你的寻路算法
// //   // 返回一个包含坐标的数组，例如：
// //   return [
// //     [0, 0],
// //     [0, 2],
// //     [2, 2],
// //   ];
// // }

// createGameBoard();

// setTimeout(() => {
//   // 在游戏逻辑中，当你找到一条有效路径时：
//   const startTile = [1, 1]; /* 获取起始tile */
//   const endTile = [9, 9]; /* 获取结束tile */
//   const path = findPath(startTile, endTile);
//   if (path) {
//     drawPath(path);
//     // 可能还需要其他操作，如消除匹配的tile等
//     // setTimeout(clearPath, 1000); // 1秒后清除路径
//   }
// }, 1000);
