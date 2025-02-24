const API_KEY = `9193cad76cf04244bb40ccdd80c1ebbb`;
const PAGE_SIZE = 1

let news= []

const getLatestNews = async() => {
    const url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`
      );
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

    const response = await fetch(url); //await함수를 기다려줘
    const data = await response.json() //이 파일 형식으로 받아줘
    news = data.articles;
    console.log("ddddd",news);
};

getLatestNews();