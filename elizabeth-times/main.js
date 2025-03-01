const API_KEY = `9193cad76cf04244bb40ccdd80c1ebbb`;
const PAGE_SIZE = 20;
let newsList = [];

const menus = document.querySelectorAll('.menus button, .menu-items button');
menus.forEach(menu => menu.addEventListener("click", (event) => {
    getNewsByCategory(event);
    closeSidebar();
}));

document.getElementById("home-logo").addEventListener("click", () => {
  fetchNews();
});

document.getElementById("hamburger-button").addEventListener("click", () => {
  document.getElementById("side-menu").style.right = "0";
});

document.querySelector(".close-button").addEventListener("click", () => {
  closeSidebar();
});

document.getElementById("search-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getNewsByKeyword();
  }
});

// Fetch latest news
const getLatestNews = async () => {
  const url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`;
  
  console.log("Fetching latest news from:", url); // 변경됨: URL 로그 추가

  const articles = await fetchNewsData(url);
  if (articles) {
    newsList = articles;
    render();
  }
};

// Reusable fetch function 
const fetchNewsData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error: HTTP status ${response.status}`); // 상태 코드 출력
      throw new Error(`Server Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data); // API 응답 전체 출력

    if (!data.articles || data.articles.length === 0) {
      throw new Error("No results found. Please try a different search term.");
    }

    return data.articles;
  } catch (error) {
    console.error("Fetch error:", error.message); // 상세 오류 출력
    errorRender(error.message);
    return null;
  }
};

// Fetch news by category
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("Category:", category);

  const url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`;
  
  const articles = await fetchNewsData(url);
  if (articles) {
    newsList = articles;
    render();
  }
};

// Fetch news by keyword
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("Keyword:", keyword);

  const url = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`;

  const articles = await fetchNewsData(url);
  if (articles) {
    newsList = articles;
    render();
  }
};

// Render news
const render = () => {
  if (!newsList || newsList.length === 0) {
    document.getElementById('news-board').innerHTML = `
      <div class="no-results">
        <p>No results found. Please try a different search term.</p>
      </div>`;
    return;
  }

  const newsHTML = newsList.map((news) => {
    const summary = news.description
      ? news.description.length > 200
        ? news.description.substring(0, 200) + "..."
        : news.description
      : "No content available";

    let imageUrl = news.urlToImage || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

    const source = news.source?.name || "No source";
    const publishedAt = moment(news.publishedAt).fromNow();

    return `
      <div class="row news">
        <div class="col-lg-4">
          <img class="news-img-size" src="${imageUrl}" alt="News Image" 
               onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';"/>
        </div>
        <div class="col-lg-8">
          <h2>${news.title}</h2>
          <p>${summary}</p>
          <div class="news-meta">${source} * <span class="news-time">${publishedAt}</span></div>
        </div> 
      </div>`;
  }).join('');

  document.getElementById('news-board').innerHTML = newsHTML;
};

// Render error messages
const errorRender = (errorMessage) => {
  document.getElementById("news-board").innerHTML = `
    <div class="alert alert-danger no-result" role="alert">${errorMessage}</div>`;
};

function closeSidebar() {
  document.getElementById("side-menu").style.right = "-250px";
}

getLatestNews();
