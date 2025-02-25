const API_KEY = `9193cad76cf04244bb40ccdd80c1ebbb`;
const PAGE_SIZE = 20;
let newsList= []
const menus = document.querySelectorAll('.menus button');
menus.forEach(menu => menu.addEventListener("click",(event)=> getNewsByCategory(event)))

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
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log("SSSS",data);

    newsList = data.articles;
    render()

}

const render = () => {
  const newsHTML = newsList.map((news)=>
        `<div class="row news">
          <div class="col-lg-4">
            <img class="news-img-size"
              src="${news.urlToImage}"/>
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <div>${news.source.name}*${news.publishedAt}</div>
          </div> 
        </div>`)
        .join('');
        //split(" ") = split texts into words, slice(0, 200) = Takes only the first 200 words from the array, join ("") = Joins the words to single string

        console.log('html',newsHTML)
  

        document.getElementById('news-board').innerHTML=newsHTML
}


getLatestNews();

