// import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function App() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);



   useEffect(() => {
    const getTrendingNews = (() => {
      const options = {
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: {safeSearch: 'Off', textFormat: 'Raw'},
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '6d96562304mshadc2c63189e167dp198697jsneb997d8abdb3',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };
      
      axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setNews(response.data.value);
      }).catch(function (error) {
        console.error(error);
      });
      
    })
    getTrendingNews()

  }, [])

  
  const getNews = (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: query,
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "6d96562304mshadc2c63189e167dp198697jsneb997d8abdb3",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };
    setIsLoading(true);
    axios
      .request(options)
      .then(function (response) {
        setIsLoading(false);
        console.log(response.data.value);
        setNews(response.data.value);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={getNews}>
        <input
          type="text"
          placeholder="Enter a Desire Topic"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button type="submit">Get News</button>
      </form>

      <div>
        {(isLoading) ? "Loading...": ""}
        {news.map((eachPost) => (
          <div className="post" key={eachPost?.name}>
            <a href={eachPost?.url} target="_blank" rel="noreferrer">
              {eachPost?.url}
            </a>
            <h1>{eachPost?.name}</h1>
            <span>
              {moment(eachPost?.datePublished).format("MMMM Do , h:mm: a")}
            </span>
            <h3>{eachPost?.description}</h3>
            <img
              src={eachPost?.image?.thumbnail?.contentUrl
                .replace("&pid=News", "")
                .replace("pid=News&", "")
                .replace("pid=News", "")}
              alt="newsimage"
            ></img>
            {/* <h3>{eachPost.}</h3> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
