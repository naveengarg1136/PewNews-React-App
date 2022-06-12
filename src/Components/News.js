import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);


function News(props) {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4735ee02c6984062994985bd3be9756f&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        props.setProgress(30);
        let data = await fetch(url);
        props.setProgress(60);
        let parseData = await data.json();
        props.setProgress(80);
        setLoading(false)
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        props.setProgress(100);
       // console.log(articles);

    }

    const captital = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    useEffect(() => {
        updateNews();
        // fetchMoreData();
    }, [])

    // const handlePrevious = async () => {
    //     setPage(page - 1)
    //     updateNews();
    // }
    // const handleNext = async () => {
    //     setPage(page + 1)
    //     updateNews();

    // }

    const fetchMoreData = async() => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4735ee02c6984062994985bd3be9756f&page=${page+1}&pageSize=${props.pageSize}`;
        // setLoading(true)
        setPage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json();

        setArticles(articles.concat(parseData.articles))
        // setLoading(false)
        setTotalResults(parseData.totalResults)

      };


    return (
        <div className="container my-3" >
            <div>
            <h2 className='text-center' style={{ margin: '20px', marginTop:'90px' }}>PewNews - Top {captital(props.category)} Headlines</h2>
            </div>
            

            {loading && <Spinner/>}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length!==totalResults}
                loader={<Spinner/>}
            >


                <div className="row">
                    {articles.map((element) => {
                        return <div className='col-md-3' key={element.url}>
                            <NewsItem
                                title={element.title ? element.title : ""}
                                discription={element.description ? element.description : ""}
                                imgUrl={element.urlToImage ? element.urlToImage : "https://c.ndtvimg.com/2022-03/uoilpns_vladimir-putin-afp-pic_650x400_02_March_22.jpg"}
                                newsUrl={element.url}
                                writer={element.author}
                                yourdate={element.publishedAt}
                                source={element.source.name}
                            />
                        </div>
                    })}
                </div>
            </InfiniteScroll>
            {/* <div className='container d-flex justify-content-between'>
                <button disabled={page <= 1} type="button" className="btn btn-dark " onClick={handlePrevious}> &larr; Previous</button>
                <button type="button" className="btn btn-dark" onClick={handleNext}>Next &rarr;</button>
            </div> */}
        </div>
    )
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"

}


export default News
