let tracker = 1;
let max = Object.keys(imgData).length;
let checkboxContainer = document.getElementById("checkbox-window");
let checkbox = document.getElementById("checkbox");
let checkboxSpinner = document.getElementById("spinner");
let verification = document.getElementById("verify-window");
let verificationArrow = document.getElementById("verify-window-arrow");
let verificationButton = document.getElementById("verify-verify-button");
let error = document.getElementById("error");

function fillTiles() {
  for(let i = 1; i < 10; i++) {
    document.getElementById(i.toString()).src = imgData[tracker][i-1];
  }

  document.getElementById("captcha-name").innerText = imgData[tracker][9];

  tracker++;
  if(tracker > max) {
    tracker = 1;
  }
}

function clickTile(i) {
  if(document.getElementById(i).className !== "tile-selected") {
    document.getElementById(i).className = "tile-selected";
  } else {
    document.getElementById(i).className = "tile-unselected";
  }
}

function clickDetection() {
  if(checkbox && verificationButton) {
    verificationButton.addEventListener("click", function (e) {
      e.preventDefault();
      error.style.display = "block";
      for(let i = 1; i < 10; i++) {
        document.getElementById(i).className = "tile-unselected";
      }
      fillTiles();
    });
    checkbox.addEventListener("click", function (e) {
      e.preventDefault();
      checkbox.disabled = true;
      spinner();
    });
    window.addEventListener('click', function(e) {
      if(verification.contains(e.target) || checkboxContainer.contains(e.target)) {
      } else {
        hideVerification();
      }
    });
  }
}

function spinner() {
  checkbox.style.width = "4px";
  checkbox.style.height = "4px";
  checkbox.style.borderRadius = "50%";
  checkbox.style.marginLeft = "25px";
  checkbox.style.marginTop = "33px";
  checkbox.style.opacity = "0";

  setTimeout(function() {
    checkboxSpinner.style.visibility = "visible";
    checkboxSpinner.style.opacity = "1";
  }, 500)
  setTimeout(function() {
    displayVerification();
  }, 900)
}

function displayVerification() {
  verification.style.display = "block";
  verification.style.visibility = "visible";
  verification.style.opacity = "1";
  verification.style.top = checkboxContainer.offsetTop - 80 + "px";
  verification.style.left =  checkboxContainer.offsetLeft + 54 + "px";

  if(verification.offsetTop < 5) {
    verification.style.top = "5px";
  }

  if(verification.offsetLeft + verification.offsetWidth > window.innerWidth-10) {
    verification.style.left =  checkboxContainer.offsetLeft - 8  + "px";
  } else {
    verificationArrow.style.top = checkboxContainer.offsetTop + 24 + "px";
    verificationArrow.style.left = checkboxContainer.offsetLeft + 45 + "px";
    verificationArrow.style.visibility = "visible";
    verificationArrow.style.opacity = "1";
  }
}

function hideVerification() {
  verification.style.display = "none";
  verification.style.visibility = "hidden";
  verification.style.opacity = "0";
  verificationArrow.style.visibility = "hidden";
  verificationArrow.style.opacity = "0";
  checkbox.style.width = "100%";
  checkbox.style.height = "100%";
  checkbox.style.borderRadius = "2px";
  checkbox.style.margin = "21px 0 0 12px";
  checkbox.style.opacity = "1";
  checkboxSpinner.style.visibility = "hidden";
  checkboxSpinner.style.opacity = "0";
  checkbox.disabled = false;
  verificationButton.disabled = false;
}
