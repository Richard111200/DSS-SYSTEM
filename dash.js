document.addEventListener("DOMContentLoaded", function () {
    const genreBtn = document.getElementById("genre-btn");
    const modal = document.getElementById("genre-modal");
    const closeModal = document.getElementById("close-modal");
    const logoutBtn = document.getElementById("logout-btn");

    // Show modal on genre button click
    genreBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close modal on 'x' button click
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Handle genre selection with specific redirects
    document.querySelectorAll(".genre-option").forEach(button => {
        button.addEventListener("click", (e) => {
            const selectedGenre = e.target.getAttribute("data-genre");

            alert(`You selected ${selectedGenre}!`);

            // Redirect to specific file based on selected genre
            let redirectUrl = '';
            if (selectedGenre === 'isekai') {
                redirectUrl = 'isekai.html';
            } else if (selectedGenre === 'action') {
                redirectUrl = 'action.html';
            } else if (selectedGenre === 'fantasy') {
                redirectUrl = 'fantasy.html';
            }

            // Redirect to the selected genre's page
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 0);
        });
    });

    // Close modal if clicking outside content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Logout functionality (example: redirect to login page)
    logoutBtn.addEventListener("click", () => {
        // You can replace this with actual logout logic, like clearing session data
        alert("You have logged out.");
        window.location.href = "index.html"; // Redirect to login page
    });
});
