const incUp = document.querySelectorAll("input[type=checkbox]")[0];
const incLow = document.querySelectorAll("input[type=checkbox]")[1];
const incNum = document.querySelectorAll("input[type=checkbox]")[2];
const incSym = document.querySelectorAll("input[type=checkbox]")[3];

function strengthColor(strength) {
  const bar1 = document.getElementById("bar1");
  const bar2 = document.getElementById("bar2");
  const bar3 = document.getElementById("bar3");
  const bar4 = document.getElementById("bar4");

  //clear existing colors

  bar1.style.background = "#24232c";
  bar2.style.background = "#24232c";
  bar3.style.background = "#24232c";
  bar4.style.background = "#24232c";

  // set new colors

  if (strength == "weak") {
    bar1.style.background = "#F64A4A";
  } else if (strength == "medium") {
    bar1.style.background = "#F8CD65";
    bar2.style.background = "#F8CD65";
  } else if (strength == "strong") {
    bar1.style.background = "#A4FFAF";
    bar2.style.background = "#A4FFAF";
    bar3.style.background = "#A4FFAF";
  } else if (strength == "bulletproof") {
    bar1.style.background = "blue";
    bar2.style.background = "blue";
    bar3.style.background = "blue";
    bar4.style.background = "blue";
  }
}

function checkStrength(length, checks) {
  let strength = "weak";

  if (checks == 1) {
    if (length < 12) {
      strength = "weak";
    } else if (length < 15) {
      strength = "medium";
    } else if (length < 18) {
      strength = "strong";
    } else {
      strength = "bulletproof";
    }
  }

  if (checks == 2) {
    if (length < 10) {
      strength = "weak";
    } else if (length < 13) {
      strength = "medium";
    } else if (length < 15) {
      strength = "strong";
    } else {
      strength = "bulletproof";
    }
  }

  if (checks == 3) {
    if (length < 8) {
      strength = "weak";
    } else if (length < 11) {
      strength = "medium";
    } else if (length < 13) {
      strength = "strong";
    } else {
      strength = "bulletproof";
    }
  }

  if (checks == 4) {
    if (length < 6) {
      strength = "weak";
    } else if (length < 10) {
      strength = "medium";
    } else if (length < 13) {
      strength = "strong";
    } else {
      strength = "bulletproof";
    }
  }
  document.querySelector(".strength-rating p").textContent =
    strength.toUpperCase();
  strengthColor(strength);
}

function generatePass() {
  const sliderSetting = document.querySelector(".slider").value;

  let checkNum = 0;
  let pass = "";
  let str = "";

  if (incUp.checked) {
    str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    checkNum += 1;
  }
  if (incLow.checked) {
    str += "abcdefghijklmnopqrstuvwxyz";
    checkNum += 1;
  }
  if (incNum.checked) {
    str += "0123456789";
    checkNum += 1;
  }
  if (incSym.checked) {
    str += "!@#$%^&*";
    checkNum += 1;
  }

  if (str == "") {
    document.querySelector(".output p").innerHTML =
      "<span style='color: red;  font-weight:bold;'>error: use check boxes</span>";
  } else if (sliderSetting < 5) {
    document.querySelector(".output p").innerHTML =
      "<span style='color: red;  font-weight:bold;'>error: 5 character minimum</span>";
  } else {
    for (let i = 1; i <= sliderSetting; i++) {
      let char = Math.floor(Math.random() * str.length);

      pass += str.charAt(char);
    }
    document.querySelector(".output p").textContent = pass;
    checkStrength(pass.length, checkNum);
  }
}

function copyClipboard(e) {
  const textToCopy = document.querySelector(".output p").textContent;

  // Create the dialog box element
  const dialogBox = document.createElement("div");
  dialogBox.style.position = "absolute";
  dialogBox.style.left = `${e.pageX}px`; // Position at click
  dialogBox.style.top = `${e.pageY}px`; // Position at click
  dialogBox.style.background = "lightgrey";
  dialogBox.style.padding = "5px 10px";
  dialogBox.style.borderRadius = "5px";
  dialogBox.style.zIndex = 1000; // Ensure it's above other elements

  // Append the dialog box to the body
  document.body.appendChild(dialogBox);

  // Check if textToCopy includes 'error' or 'ready'
  if (textToCopy.includes("error") || textToCopy.includes("ready")) {
    dialogBox.textContent = "Failed";
    dialogBox.style.color = "red";
  } else {
    // Attempt to copy text to clipboard
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        dialogBox.textContent = "Copied";
        dialogBox.style.color = "black";
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        dialogBox.textContent = "Failed";
        dialogBox.style.color = "red";
      });
  }

  // Remove the dialog box after 2 seconds
  setTimeout(() => {
    document.body.removeChild(dialogBox);
  }, 2000); // Adjust time as needed
}

//Event listener

document.querySelector("button").addEventListener("click", generatePass);

document.querySelector(".slider").addEventListener("input", () => {
  document.getElementById("length-number").textContent =
    document.querySelector(".slider").value;
});

// copy button

document
  .querySelector("svg")
  .addEventListener("click", (e) => copyClipboard(e));

// slider reset

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".slider").value = "8";
});
