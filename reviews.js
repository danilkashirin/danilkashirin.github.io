document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const reviewsContainer = document.getElementById("reviews");

    function fetchReviews() {
        preloader.classList.add("loading");

        fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const currentDateTime = new Date().toLocaleString();


                const fetchedReviews = data.map(review => ({
                    ...review,
                    date: currentDateTime
                }));

                const userReviews = JSON.parse(localStorage.getItem("reviews")) || [];
                const allReviews = fetchedReviews.concat(userReviews);


                allReviews.sort((a, b) => {
                    if (a.date && b.date) {
                        return new Date(b.date) - new Date(a.date);
                    } else if (a.date) {
                        return -1;
                    } else if (b.date) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                preloader.classList.remove("loading");
                renderReviews(allReviews);
            })
            .catch(error => {
                preloader.classList.remove("loading");
                errorFallback();
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function renderReviews(reviews) {
        reviewsContainer.innerHTML = "";
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <h3>${review.name}</h3>
                <p>${review.email}</p>
                <p>${review.body}</p>
                <small>Дата: ${review.date ? review.date : "Дата неизвестна"}</small>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }

    function errorFallback() {
        const errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.textContent = '⚠ Что-то пошло не так!';
        reviewsContainer.appendChild(errorElement);
    }

    fetchReviews();
});