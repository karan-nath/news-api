
const apiKey = "8894040560d84e308e7cee101563aa3f";

const blogContainer = document.getElementById("blog-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=in&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || "";
        img.alt = article.title || "Image";

        const title = document.createElement("h2");
        title.textContent = article.title || "No Title";

        const description = document.createElement("p");
        description.textContent = article.description || "No Description";

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogContainer.appendChild(blogCard);
    });
}

async function fetchNewsByQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsByQuery(query);
            displayBlogs(articles);
            console.log(articles);
        } catch (error) {
            console.error("Error fetching news for query", error);
        }
    }
});

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
        console.log(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
