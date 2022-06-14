import React, {Component} from 'react'
import NewsItem from '../newsItem/NewsItem'
import Spinner from '../spinner/Spinner';
import './news.css'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component{
    static defaultProps = {
        pageSize : 6,
        country : "in",
        category : "general"
    }

    static propTypes = {
        pageSize : PropTypes.number,
        country : PropTypes.string,
        category : PropTypes.string
    }
    
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading : true,
            page : 1,
            totalResults : 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - ARFNews`
    }

    // async updateNews(){
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=bebdee79b5bb40cf90efe21cedb075c1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading : true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({
    //         articles : parsedData.articles, 
    //         totalResults : parsedData.totalResults,
    //         loading : false
    //         })
    // }
    
    async componentDidMount(){
        this.props.setProgress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(60)
        this.setState({
            articles : parsedData.articles, 
            totalResults : parsedData.totalResults,
            loading : false
            })
        this.props.setProgress(100)
    }
    

    // handlePrevClick = async() => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=efd8236e0ce542f1ac7f3eea9fc7a174&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading : true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({
    //         articles : parsedData.articles, 
    //         loading : false,
    //         page : this.state.page -1
    //         })
    // }
        

    // handleNextClick = async() => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=efd8236e0ce542f1ac7f3eea9fc7a174&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading : true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     this.setState({
    //         articles : parsedData.articles,
    //         loading : false,
    //         page : this.state.page + 1
    //         })
    // }

    fetchMoreData = async() => {
        this.setState({page : this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles : this.state.articles.concat(parsedData.articles), 
            totalResults : parsedData.totalResults,
            })
    }

    render(){
        return(
            <div>
                <h2 className='topTitle mb-4 mt-4'>ARFNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                
                <InfiniteScroll
                  dataLength={this.state.articles.length}
                  next={this.fetchMoreData}
                  hasMore={this.state.articles.length !== this.state.totalResults}
                  loader={<Spinner/>} >
                  
                <div className='container'>
                <div className="row">
                        {this.state.articles.map((articlesItem) => {
                         return <div className="col-md-4" key={articlesItem.url}>
                           <NewsItem 
                              title = {articlesItem.title}
                              description = {articlesItem.description}
                              imageUrl = {articlesItem.urlToImage}
                              newsUrl = {articlesItem.url}
                              date = {articlesItem.publishedAt}
                              author = {articlesItem.author}
                              source = {articlesItem.source.name}
                            />
                         </div>})}
                </div>
                </div>
                </InfiniteScroll>
                

                {/* <div className="container arrowButtons mt-4">
                    <button disabled={this.state.page<=1} onClick={this.handlePrevClick} className='btn btn-dark btn-sm'> &larr; Previous</button>
                    <button disabled={this.state.page >= (Math.ceil(this.state.totalResults/this.props.pageSize))} onClick={this.handleNextClick} className='btn btn-dark btn-sm'>Next &rarr;</button>
                </div> */}

            </div>
            
        )
    }
}
