document.getElementById("reviewForm").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector("#reviewForm button[type=submit]").click();
    }
});

document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const review = document.getElementById("review").value;
    const date = new Date().toLocaleString();

    const newReview = {
        name: name,
        email: email,
        body: review,
        date: date
    };

    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    existingReviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(existingReviews));

    document.getElementById("reviewForm").reset();

    window.location.href = "lab6.html";
});