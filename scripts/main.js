// build a keyboard
const keyboard = document.getElementById("keyboard")

const keyboardLayout = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Z","X","C","V","B","N","M"]
];

// put keys on keyboard id
keyboardLayout.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");

  row.forEach(key => {
    const button = document.createElement("button");
    button.textContent = key;

    button.addEventListener("click", () => {
      console.log("Clicked:", key);
    });

    rowDiv.appendChild(button);
  });

  keyboard.appendChild(rowDiv);
});