const hexColors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const items = document.querySelectorAll(".item");

const getRandomHexColor = () => {
  return Math.floor(Math.random() * hexColors.length);
};

const generateRandomHexColor = () => {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hexColors[getRandomHexColor()];
  }
  return hexColor;
};

const updateColorsHash = (colors = []) => {
  document.location.hash = colors
    .map((color) => {
      return color.toLowerCase().substring(1);
    })
    .join("-");
};

const getColorsFromHash = () => {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  } else {
    return [];
  }
};

const setRandomColor = (isInitial) => {
  const colors = isInitial ? getColorsFromHash() : [];

  items.forEach((item, index) => {
    const isLocked = item
      .querySelector(".icon--button")
      .classList.contains("lock");
    const itemText = item.querySelector(".item__text");
    const hexColor = isInitial
      ? colors[index]
        ? colors[index]
        : generateRandomHexColor()
      : generateRandomHexColor();
    if (isLocked) {
      colors.push(itemText.textContent);
      return;
    }
    if (!isInitial) {
      colors.push(hexColor);
    }
    itemText.textContent = hexColor;
    item.style.backgroundColor = hexColor;
    setTextColor(itemText, hexColor);
  });

  updateColorsHash(colors);
};

const setTextColor = (itemText, hexColor) => {
  const luminance = chroma(hexColor).luminance();
  itemText.style.color = luminance > 0.5 ? "black" : "white";
};
setRandomColor(true);

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code.toLowerCase() === "space") {
    setRandomColor();
  }
});

document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;
  if (type === "lock") {
    const node =
      e.target.tagName.toLowerCase() === "span"
        ? e.target
        : e.target.children[0];

    node.classList.toggle("lock");
  }
});
