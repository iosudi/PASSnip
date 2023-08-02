// DOM Elements
const passwordInput = $(".input-field input");
const passwordIndicator = $(".password");
const length = $(".pass-length input");
const options = $(".option input");
const container = $(".container");
const copyBtn = $(".fa-copy");
const genBtn = $(".gen-btn");
const moreBtn = $(".more-btn");
const moreIcon = $(".more-btn");
const passSettings = $(".pass-settings");

// Character sets for password generation
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "@#$%^&*()_-+={[}]|;'<,>.?/",
};

// Function to generate a random password based on selected options
const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  let passLength = length.val();

  options.each(function () {
    if ($(this).prop("checked")) {
      let selectedOptionId = $(this).attr("id");
      let selectedCharacterSet = characters[selectedOptionId];

      if (selectedOptionId !== "duplicate" && selectedOptionId !== "spaces") {
        staticPassword += selectedCharacterSet;
      } else if (selectedOptionId === "spaces") {
        staticPassword += " ";
      } else {
        excludeDuplicate = true;
      }
    }
  });

  if (staticPassword.length === 0) {
    return; // No options are selected, so we cannot generate a password
  }

  // Generate the random password based on selected options and length
  for (let i = 1; i <= passLength; i++) {
    let rand =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(rand) || rand == " "
        ? (randomPassword += rand)
        : i--;
    } else {
      randomPassword += rand;
    }
  }

  passwordInput.val(randomPassword);
};

// Function to update the slider value for password length and generate a new password
const updateSlider = () => {
  $(".pass-length span").text(length.val());
  generatePassword();
};

// Function to copy the generated password to the clipboard
const copyPass = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(passwordInput.val());
    alert("Your password has been copied!");
  }
};

// Event listeners
moreBtn.on("click", () => {
  container.toggleClass("expanded");
  passSettings.toggleClass("appear");
  if (container.hasClass("expanded")) {
    moreIcon.html(`<i class="fa-solid fa-angle-up"></i>`);
  } else {
    moreIcon.html(`<i class="fa-solid fa-angle-down"></i>`);
  }
});

genBtn.on("click", generatePassword);
length.on("input", updateSlider);
copyBtn.on("click", copyPass);

// Initial setup
updateSlider();
