// ==========================================
// Tax Calculator Frontend Script
// Developed by #ZohaibSattarDataAI
// ==========================================

const API_BASE_URL = "https://full-stack-web-development-real-world-projects-production.up.railway.app";

// ==========================================
// DOM Elements
// ==========================================

const salaryInput = document.getElementById("salaryInput");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const loaderContainer = document.getElementById("loaderContainer");
const resultsCard = document.getElementById("resultsCard");

const grossSalarySpan = document.getElementById("grossSalary");
const taxRateSpan = document.getElementById("taxRate");
const taxAmountSpan = document.getElementById("taxAmount");

const finalSalarySpan = document.querySelector("#finalSalary .amount");

const taxBracketSpan = document.getElementById("taxBracket");
const tipText = document.getElementById("tipText");

const bracketFill = document.getElementById("bracketFill");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const apiStatus = document.getElementById("apiStatus");

// Safe theme icon
const themeToggleIcon = document.querySelector("#themeToggle i");

// ==========================================
// AOS Init
// ==========================================

if (typeof AOS !== "undefined") {
    AOS.init({ duration: 800, once: true });
}

// ==========================================
// Theme
// ==========================================

function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    if (!themeToggleIcon) return;

    themeToggleIcon.className =
        theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode`);
}

document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);

// ==========================================
// Toast
// ==========================================

let toastTimeout;

function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// ==========================================
// Currency
// ==========================================

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-PK", {
        maximumFractionDigits: 0
    }).format(amount);
}

// ==========================================
// Bracket Indicator
// ==========================================

function updateBracketIndicator(salary) {
    if (!bracketFill) return;

    let percentage = 0;

    // 0% tax bracket
    if (salary <= 30000) {
        percentage = (salary / 30000) * 33;
    }

    // 15% tax bracket
    else if (salary <= 70000) {
        percentage = 33 + ((salary - 30000) / 40000) * 33;
    }

    // 25% tax bracket
    else {
        percentage = 66 + ((salary - 70000) / 130000) * 34;
    }

    bracketFill.style.width = `${Math.min(Math.max(percentage, 0), 100)}%`;
}

// ==========================================
// Highlight
// ==========================================

function updateBracketHighlight(salary) {
    document.querySelectorAll(".bracket-card").forEach(card => {
        card.classList.remove("active-bracket");
        card.style.transform = "scale(1)";
        card.style.opacity = "0.7";
    });

    let activeCard;

    if (salary <= 30000) {
        activeCard = document.querySelector(".bracket-low");
    } else if (salary <= 70000) {
        activeCard = document.querySelector(".bracket-mid");
    } else {
        activeCard = document.querySelector(".bracket-high");
    }

    if (activeCard) {
        activeCard.classList.add("active-bracket");
        activeCard.style.transform = "scale(1.05)";
        activeCard.style.opacity = "1";
    }
}

// ==========================================
// Animation
// ==========================================

function animateNumber(element, endValue, isPercentage = false) {
    if (!element) return;

    let current = 0;
    const step = endValue / 45;

    const interval = setInterval(() => {
        current += step;

        if (current >= endValue) {
            current = endValue;
            clearInterval(interval);
        }

        element.textContent = isPercentage
            ? `${Math.floor(current)}%`
            : formatCurrency(Math.floor(current));
    }, 16);
}

// ==========================================
// Show Results
// ==========================================

function showResults(data) {
    if (!resultsCard) return;

    resultsCard.style.display = "block";

    animateNumber(grossSalarySpan, data.salary);
    animateNumber(taxRateSpan, data.tax_rate_percent, true);
    animateNumber(taxAmountSpan, data.tax);
    animateNumber(finalSalarySpan, data.final_salary);

    let label =
        data.salary <= 30000
            ? "LOW INCOME"
            : data.salary <= 70000
            ? "MIDDLE INCOME"
            : "HIGH INCOME";

    if (taxBracketSpan) {
        taxBracketSpan.innerHTML = `${label}`;
    }

    updateBracketIndicator(data.salary);
    updateBracketHighlight(data.salary);
}

// ==========================================
// API
// ==========================================

async function checkAPIConnection() {
    if (!apiStatus) return false;

    try {
        const res = await fetch(`${API_BASE_URL}/health`);

        if (!res.ok) throw new Error();

        apiStatus.innerHTML = "Connected";
        return true;

    } catch {
        apiStatus.innerHTML = "Offline";
        return false;
    }
}

// ==========================================
// Calculate
// ==========================================

async function calculateTax() {
    const salary = parseFloat(salaryInput?.value || 0);

    if (!salary || salary <= 0) {
        showToast("Enter valid salary");
        return;
    }

    loaderContainer && (loaderContainer.style.display = "block");
    calculateBtn && (calculateBtn.disabled = true);

    try {
        const res = await fetch(`${API_BASE_URL}/calculate/corrected`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ salary })
        });

        const data = await res.json();

        if (data.success) {
            showResults(data.data);
            showToast("Success");
        } else {
            showToast(data.error || "Error");
        }

    } catch (e) {
        showToast("Server error");
    } finally {
        loaderContainer && (loaderContainer.style.display = "none");
        calculateBtn && (calculateBtn.disabled = false);
    }
}

// ==========================================
// Reset
// ==========================================

function resetForm() {
    if (salaryInput) salaryInput.value = "";

    if (resultsCard) resultsCard.style.display = "none";

    if (bracketFill) bracketFill.style.width = "0%";

    showToast("Reset done");
}

// ==========================================
// Events
// ==========================================

calculateBtn?.addEventListener("click", calculateTax);
resetBtn?.addEventListener("click", resetForm);

salaryInput?.addEventListener("input", () => {
    const val = parseFloat(salaryInput.value || 0);
    if (val) {
        updateBracketIndicator(val);
        updateBracketHighlight(val);
    }
});

// ==========================================
// Init
// ==========================================

initTheme();
checkAPIConnection();

console.log("Frontend Ready");
