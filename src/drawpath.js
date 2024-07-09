export function drawPath(path) {
  // 清除之前的路径
  clearPath();

  let rect = document
    .querySelector(".tile[data-row='0'][data-col='0']")
    .getBoundingClientRect();
  const gameboard = document.getElementById("game-board");
  let gap = parseFloat(window.getComputedStyle(gameboard).gap);
  let padding = parseFloat(window.getComputedStyle(gameboard).padding);

  for (let i = 0; i < path.length - 1; i++) {
    if (path[i].y == path[i + 1].y && path[i].x == path[i + 1].x) continue;

    const pathSegment = document.createElement("div");
    pathSegment.classList.add("path-segment");

    if (path[i].y === path[i + 1].y) {
      // 水平路径
      pathSegment.classList.add("path-horizontal");
      pathSegment.style.width = `${
        (rect.width + gap) * Math.abs(path[i].x - path[i + 1].x)
      }px`;
      pathSegment.style.left = `${
        (rect.width + gap) * Math.min(path[i].x, path[i + 1].x) +
        rect.width / 2 +
        rect.left
      }px`;
      pathSegment.style.top = `${
        (rect.height + gap) * path[i].y + rect.top + rect.height / 2
      }px`;
    } else {
      // 垂直路径
      pathSegment.classList.add("path-vertical");
      pathSegment.style.height = `${
        (rect.height + gap) * Math.abs(path[i].y - path[i + 1].y)
      }px`;
      pathSegment.style.left = `${
        (rect.width + gap) * path[i].x + rect.left + rect.width / 2
      }px`;
      pathSegment.style.top = `${
        (rect.height + gap) * Math.min(path[i].y, path[i + 1].y) +
        rect.height / 2 +
        rect.top
      }px`;
    }

    document.body.appendChild(pathSegment);
  }
}

export function clearPath() {
  const pathSegments = document.querySelectorAll(".path-segment");
  pathSegments.forEach((segment) => segment.remove());
}
