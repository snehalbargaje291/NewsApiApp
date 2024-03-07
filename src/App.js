import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
  apiKey= process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Routes>
            <Route
              exact
              path="/"
              element={<News apiKey={this.apiKey} key="general" category="general" />}
            />
            <Route
              exact
              path="/business"
              element={<News apiKey={this.apiKey} key="business" category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={<News apiKey={this.apiKey} key="entertainment" category="entertainment" />}
            />
            <Route
              exact
              path="/health"
              element={<News apiKey={this.apiKey} key="health" category="health" />}
            />
            <Route
              exact
              path="/sports"
              element={<News apiKey={this.apiKey} key="sports" category="sports" />}
            />
            <Route
              exact
              path="/science"
              element={<News apiKey={this.apiKey} key="science" category="science" />}
            />
            <Route
              exact
              path="/technology"
              element={<News apiKey={this.apiKey} key="technology" category="technology" />}
            />
          </Routes>
        </Router>
      </>
    );
  }
}
