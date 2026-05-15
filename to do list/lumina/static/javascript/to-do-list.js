// simple enhancement

document.addEventListener("DOMContentLoaded", () => {
    console.log("Lumina Loaded");

    // Example: confirmation before delete
    document.querySelectorAll("a[href*='delete']").forEach(btn => {
        btn.addEventListener("click", (e) => {
            if(!confirm("Delete this task?")) {
                e.preventDefault();
            }
        });
    });
});