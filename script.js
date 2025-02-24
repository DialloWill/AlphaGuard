function generatePassword() {
    const length = document.getElementById("passwordLength").value;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let allowedChars = lowercaseChars;
    if (includeUppercase) allowedChars += uppercaseChars;
    if (includeNumbers) allowedChars += numberChars;
    if (includeSymbols) allowedChars += symbolChars;

    let password = "";
    for (let i = 0; i < length; i++) {
        password += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }

    document.getElementById("passwordDisplay").value = password;
}

function copyPassword() {
    const passwordField = document.getElementById("passwordDisplay");
    passwordField.select();
    document.execCommand("copy");

    const copyMessage = document.getElementById("copyMessage");
    copyMessage.textContent = "Password copied to clipboard!";
    setTimeout(() => { copyMessage.textContent = ""; }, 2000);
}
