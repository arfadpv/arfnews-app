import './App.css';
import React, { Component } from 'react'
import Navbar from './components/navbar/Navbar';
import News from './components/news/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import LoadingBar from '../node_modules/react-top-loading-bar'


export default class App extends Component {

  apiKey = "bebdee79b5bb40cf90efe21cedb075c1"
  
  state = {progress : 0}

  setProgress = (progress) => {
    this.setState({progress : progress })}
  pageSize = 15

  render() {
    return (
      <div>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height = '3px'
      />
        <Navbar />
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<News setProgress={this.setProgress}  apiKey = {this.apiKey} pageSize = {this.pageSize} country = "in" category = "general"/>}/>
          <Route path='/business' element={<News setProgress={this.setProgress}  apiKey = {this.apiKey} pageSize = {this.pageSize} country = "in" category = "business"/>}/>
          <Route path='/entertainment' element={<News setProgress={this.setProgress}  apiKey = {this.apiKey} pageSize = {this.pageSize} country = "in" category = "entertainment"/>}/>
          <Route path='/health' element={<News setProgress={this.setProgress}  apiKey = {this.apiKey} pageSize = {this.pageSize} country = "in" category = "health"/>}/>
          <Route path='/sports' element={<News setProgress={this.setProgress}  apiKey = {this.apiKey} pageSize = {this.pageSize} country = "in" category = "sports"/>}/>
          <Route path='/science' element={<News setProgress={this.setProgress}  apiKey = {this.apiKey} pageSize = {this.pageSize} country = "in" category = "science"/>}/>
          <Route path='/technology' element={<News setProgress={this.setProgress}  apiKey = {this.apiKey} pageSize = {this.pageSize} country = "in" category = "technology"/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    )
    }
  }
