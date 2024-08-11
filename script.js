const API_KEY = "1050a75a12214b2b96fb3b1a8af54e36";
const url = "https://newsapi.org/v2/everything?q=";



window.addEventListener("load", () => fetchNews("India"));


const reload = () => {
    window.location.reload();
};

const fetchNews = async(query) => {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
};

const fillDataToCard = (cardClone, article) => {
    const newsImage = cardClone.querySelector("#news-image");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDescription = cardClone.querySelector("#news-desc");

    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;
    newsSource.innerHTML = `${article.source.name}, ${date}`;
    
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_balnk");
    });
};

const bindData = (articles) => {
    const cardsCointainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsCointainer.innerHTML = "";
    articles.forEach(currArticles => {
        if(!currArticles.urlToImage) return;
        if(currArticles.title === "Follow live: India, Australia meet with semifinal places at stake") return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataToCard(cardClone, currArticles);
        cardsCointainer.appendChild(cardClone);
    });
};

let currSelectedNav = null;

const onNavItemClick = (id) => {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = navItem;
    currSelectedNav.classList.add("active");
};


const searchText = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    searchText.innerHTML = "";
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = null;
});