function calculatePercentage() {
    const obtained = parseFloat(document.getElementById('obtained').value);
    const total = parseFloat(document.getElementById('total').value);
    const percentageInput = document.getElementById('percentage');
    const percentageBar = document.getElementById('percentage-bar');
    const percentageText = document.getElementById('percentage-text');

    // Validation
    if (isNaN(obtained) || isNaN(total) || total <= 0 || obtained < 0 || obtained > total) {
        alert("Please enter valid numbers. Obtained cannot exceed total.");
        return;
    }

    const percentage = (obtained / total) * 100;
    percentageInput.value = percentage.toFixed(2) + "%";

    // Visual bar
    percentageBar.style.width = percentage + "%";
    percentageText.textContent = percentage.toFixed(2) + "%";

    // Color coding
    if (percentage >= 80) {
        percentageBar.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
        percentageText.style.color = '#10b981';
    } else if (percentage >= 50) {
        percentageBar.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
        percentageText.style.color = '#f59e0b';
    } else {
        percentageBar.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
        percentageText.style.color = '#ef4444';
    }
}

// Event listener
document.getElementById('calculate-btn').addEventListener('click', calculatePercentage);
