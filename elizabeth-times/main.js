const API_KEY = `9193cad76cf04244bb40ccdd80c1ebbb`;
const PAGE_SIZE = 20;
let newsList= []
const menus = document.querySelectorAll('.menus button');
menus.forEach(menu => menu.addEventListener("click",(event)=> getNewsByCategory(event)))

document.getElementById("home-logo").addEventListener("click", () => {
  fetchNews();
});

document.getElementById("search-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      getNewsByKeyword(); 
  }
});

const getLatestNews = async() => {
    const url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`
      );
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

    const response = await fetch(url); //await함수를 기다려줘
    const data = await response.json() //이 파일 형식으로 받아줘
    newsList = data.articles;
    render();
    console.log("ddddd",newsList);
};

const getNewsByCategory = async (event)=>{
    const category = event.target.textContent.toLowerCase();
    console.log("category",category);
    url = new URL(
      `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
    );
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log("SSSS",data);

    newsList = data.articles;
    render()

}

const getNewsByKeyword = async() =>{
  const keyword =  document.getElementById("search-input").value;
  console.log("keyword",keyword);
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`
  );
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}}&apiKey=${API_KEY}`);

  const response = await fetch(url)
  const data = await response.json()

  console.log("keyword data", data);

  newsList = data.articles;

  render();
}

const render = () => {
  if (!newsList || newsList.length === 0) {
    document.getElementById('news-board').innerHTML = `
      <div class="no-results">
        <p> No results found. Please try a different search term.</p>
      </div>`;
    return;
  }
  const newsHTML = newsList.map((news) => {
  
    const summary = news.description 
      ? news.description.length > 200 
        ? news.description.substring(0, 200) + "..." 
        : news.description 
      : "내용없음"; 

    // Handle missing images properly
    let imageUrl = news.urlToImage;
    if (!imageUrl || imageUrl === "null" || imageUrl === "undefined") {
      imageUrl = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"; 
    }


    const source = news.source?.name || "no source";

    return `
      <div class="row news">
        <div class="col-lg-4">
          <img class="news-img-size" src="${imageUrl}" alt="News Image" 
               onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';"/>
        </div>
        <div class="col-lg-8">
          <h2>${news.title}</h2>
          <p>${summary}</p>
          <div class="news-meta">${source} * ${news.publishedAt}</div>
        </div> 
      </div>`;
  }).join('');

  document.getElementById('news-board').innerHTML = newsHTML;
};


getLatestNews();

