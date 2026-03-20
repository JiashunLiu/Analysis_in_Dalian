const AUTH_PASSWORD = "00860411";
const AUTH_STORAGE_KEY = "analysis-pdes-dalian-auth";

function unlockPage(overlay, protectedContent) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, AUTH_PASSWORD);
    protectedContent.classList.remove("auth-locked");
    overlay.remove();
}

function showPasswordGate() {
    const main = document.querySelector("main");
    const protectedContent = document.querySelector("[data-protected-content]");

    if (!main || !protectedContent) {
        return;
    }

    if (sessionStorage.getItem(AUTH_STORAGE_KEY) === AUTH_PASSWORD) {
        return;
    }

    protectedContent.classList.add("auth-locked");

    const overlay = document.createElement("section");
    overlay.className = "auth-overlay";
    overlay.innerHTML = `
        <div class="auth-card" aria-labelledby="auth-title">
            <h2 id="auth-title">Password Required</h2>
            <p>Please enter the password to view the participants page.</p>
            <form class="auth-form">
                <input class="auth-input" type="password" name="password" placeholder="Enter password" autocomplete="current-password" aria-label="Password">
                <button class="auth-button" type="submit">Enter</button>
                <div class="auth-error" aria-live="polite"></div>
            </form>
        </div>
    `;

    const form = overlay.querySelector(".auth-form");
    const input = overlay.querySelector(".auth-input");
    const error = overlay.querySelector(".auth-error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (input.value === AUTH_PASSWORD) {
            unlockPage(overlay, protectedContent);
            return;
        }

        error.textContent = "Incorrect password. Please try again.";
        input.value = "";
        input.focus();
    });

    main.insertBefore(overlay, protectedContent);
    window.requestAnimationFrame(() => input.focus());
}

window.addEventListener("DOMContentLoaded", showPasswordGate);
