import React from 'react';
import { Router } from '@reach/router';

import Home from './components/Home';
import About from './components/About';
import OurWork from './components/OurWork';
import SinglePost from './components/SinglePost';
import Blog from './components/Blog';
import PostCreate from './components/PostCreate';
import './style.css';
import Contact from './components/Contact';
import Shop from './components/Shop';


function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/"/>
        <About path="/about/:id"/>
        <OurWork path="/our-work/:id"/>
        <Blog path="/blog"/>
        <Shop path="/shop"/>
        <PostCreate path="/post-create/:id"/>
        <SinglePost path="/post/:id" />
        <Contact path="/contact"/>
      </Router>
    </div>
  );
}

export default App;
