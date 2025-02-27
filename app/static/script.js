function generatePassword() {
    let length = parseInt(document.getElementById("passwordLength").value, 10);

    // Ensure the length is at least 9 characters
    if (length < 9) {
        alert("Passwords must be at least 9 characters long for security.");
        return;
    }

    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~|}{[]:;?><,./-=";

    let allowedChars = lowercaseChars;
    if (includeUppercase) allowedChars += uppercaseChars;
    if (includeNumbers) allowedChars += numberChars;
    if (includeSymbols) allowedChars += symbolChars;

    if (allowedChars.length === lowercaseChars.length) {
        alert("Please select at least one additional character set for a stronger password.");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }

    // Display password in input field
    document.getElementById("passwordDisplay").value = password;

    // Update password difficulty
    updatePasswordDifficulty(password);
}

function getPasswordDifficulty(password) {
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+~|}{[\]:;?><,./=-]/.test(password);

    const complexity = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;

    if (length < 9) {
        return { text: "Weak", class: "weak" };
    } 
    if (length <= 11 && complexity === 2) {
        return { text: "Moderate", class: "moderate" };
    } 
    if (length >= 12 && complexity >= 3) {
        return { text: "Strong", class: "strong" };
    } 
    if (length >= 14 && complexity === 4) {
        return { text: "Very Strong", class: "very-strong" };
    }

    return { text: "Moderate", class: "moderate" };
}

function updatePasswordDifficulty(password) {
    const difficultyElement = document.getElementById("passwordDifficulty");
    const { text, class: difficultyClass } = getPasswordDifficulty(password);

    difficultyElement.textContent = `Password Strength: ${text}`;
    difficultyElement.className = difficultyClass;
}

function copyPassword() {
    const passwordField = document.getElementById("passwordDisplay");
    
    if (!passwordField.value) {
        alert("No password generated to copy!");
        return;
    }

    navigator.clipboard.writeText(passwordField.value)
        .then(() => {
            const copyMessage = document.getElementById("copyMessage");
            copyMessage.textContent = "Password copied to clipboard!";
            setTimeout(() => { copyMessage.textContent = ""; }, 2000);
        })
        .catch(err => console.error("Error copying password:", err));
}

// Fix for the "Upgrade to Premium" button issue
function subscribePremium() {
    window.location.href = "/premium";
}
