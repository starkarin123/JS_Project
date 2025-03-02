const API_KEY = `9193cad76cf04244bb40ccdd80c1ebbb`;
let newsList = [];
let totalResult = 0
let page = 1 
const PAGE_SIZE = 10;
const groupSize = 5


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

const getLatestNews = async () => {
  let url = new URL("https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines");
  url.searchParams.set("country", "kr");
  url.searchParams.set("page", 1); // Ensure first page is correctly fetched
  url.searchParams.set("pageSize", PAGE_SIZE); // Force page size to be consistent

  console.log("Fetching latest news from:", url.toString()); 

  const data = await fetchNewsData(url);
  if (data) {
    newsList = data.articles;
    totalResults = data.totalResults;
    render();
    paginationRender();
  }
};

// Reusable fetch function 
const fetchNewsData = async (url) => {
  try {
    console.log("Fetching URL:", url.toString()); // Debugging

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

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message); // 상세 오류 출력
    errorRender(error.message);
    return null;
  }
};

// Fetch news by category
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase().trim();
  console.log("Selected Category:", category);

  page = 1; // Reset to first page for new category selection

  let url = new URL("https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines");
  url.searchParams.set("country", "kr");
  url.searchParams.set("category", category);
  url.searchParams.set("page", page);
  url.searchParams.set("pageSize", PAGE_SIZE);

  console.log("Fetching category:", category);
  console.log("Fetching URL:", url.toString()); // Debugging

  const data = await fetchNewsData(url);
  if (data) {
    newsList = data.articles;
    totalResults = data.totalResults;
    render();
    paginationRender();
  }
};


// Fetch news by keyword
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value.trim(); // Remove extra spaces
  if (!keyword) {
    alert("Please enter a search term.");
    return;
  }

  page = 1; // Reset to first page for a new search

  let url = new URL("https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines");
  url.searchParams.set("country", "kr");
  url.searchParams.set("q", keyword);
  url.searchParams.set("page", page);
  url.searchParams.set("pageSize", PAGE_SIZE);

  console.log("Searching for:", keyword);
  console.log("Fetching URL:", url.toString()); // Debugging

  const data = await fetchNewsData(url);
  if (data) {
    newsList = data.articles;
    totalResults = data.totalResults;
    render();
    paginationRender();
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


const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);
  if (totalPages === 0) return;

  let pagesToShow = totalPages <= 5 ? 3 : 5; 
  const pageGroup = Math.ceil(page / pagesToShow);

  let lastPage = pageGroup * pagesToShow;
  if (lastPage > totalPages) {
      lastPage = totalPages; // Ensure last page does not exceed total pages
  }

  let firstPage = lastPage - (pagesToShow - 1);
  if (firstPage < 1) firstPage = 1; // Ensure first page is never less than 1

  let paginationHTML = "";

  // Show "« ‹" only if not on the first page
  if (page > 1) {
      paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(1)">«</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(${page - 1})">‹</a>
      </li>`;
  }

  // Page numbers
  for (let i = firstPage; i <= lastPage; i++) {
      let active = i === page ? "active" : "";
      paginationHTML += `
      <li class="page-item ${active}">
        <a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a>
      </li>`;
  }

  // Show "› »" only if not on the last page
  if (page < totalPages) {
      paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(${page + 1})">›</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" onclick="moveToPage(${totalPages})">»</a>
      </li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};


const moveToPage = (pageNum) => {
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);
  if (pageNum < 1 || pageNum > totalPages) return;

  page = pageNum; // Update current page

  let updatedUrl = new URL("https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines");
  updatedUrl.searchParams.set("country", "kr");
  updatedUrl.searchParams.set("page", page);
  updatedUrl.searchParams.set("pageSize", PAGE_SIZE);

  console.log("Fetching page:", pageNum, "Updated URL:", updatedUrl.toString());

  fetchNewsData(updatedUrl).then((data) => {
      if (data) {
          newsList = data.articles;
          render();
          paginationRender();
      }
  });
};

getLatestNews();
