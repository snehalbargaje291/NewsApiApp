import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
    document.title=`${this.capitalizeFirst(this.props.category)}-NewsApp`
  }
  capitalizeFirst=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  fetchArticles = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
      let response = await fetch(url);
      let parsedData = await response.json();

      this.setState({
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  componentDidMount= async()=> {
    this.fetchArticles();
  }
  handlePreviousClick = async () => {
    try {
      this.setState({ page: this.state.page - 1 });
      this.fetchArticles();
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  handleNextClick = async () => {
    try {
      this.setState({ page: this.state.page + 1 });
      this.fetchArticles();
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  render() {
    return (
      <div className="container my-4" >
        <h1 className="text-center" style={{marginTop: '90px'}}>Top {this.capitalizeFirst(this.props.category)} Headlines</h1>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-secondary"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-secondary"
            onClick={this.handleNextClick}
          >
            Next button &rarr;
          </button>
        </div>
        {this.state.loading && <Loading />}
        <div className="row my-4">
          {!this.state.loading &&
            this.state.articles?.map((element) => {
              return (
                <div
                  className="col-md-4 d-flex justify-content-evenly"
                  key={element.url}
                >
                  <NewsItem
                    title={
                      element.title
                        ? element.title.slice(0, 40)
                        : "Read More about this news"
                    }
                    source={element.source.name}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : "Description not availabe"
                    }
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://image.cnbcfm.com/api/v1/image/107352725-1703868801506-gettyimages-1892485540-lastday145594_57x0ooil.jpeg?v=1703868894&w=1920&h=1080"
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default News;
