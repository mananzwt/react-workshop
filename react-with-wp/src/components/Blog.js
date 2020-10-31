import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from "@reach/router";
import rednerHTML from 'react-render-html';
import Moment from 'react-moment';


class Blog extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      posts: [],
      WordPressSiteUrl: 'http://localhost:8888/vue-wp/admin',
      error: ''
    }
  }

  componentDidMount(){
    
    this.setState({loading: true}, () => {
      axios.get(`${this.state.WordPressSiteUrl}/wp-json/wp/v2/posts`)
      .then(res=> {
        console.warn(res.data);
        this.setState({loading: false, posts: res.data})
      })
      .catch(error => this.setState({loading: false, error: error.response.data.message}))
    });
  }

  render(){

    const { posts, error } = this.state;

    return(
      <div>
        <Navbar />
          {error && <div className="alert alert-danger">{error}</div>}
          {posts.length ? (
            <div className='mt-5 container'>
              <div className='d-flex row'>
                {posts.map( post => (
                  <div key={ post.id } className='mb-30 col-md-4'>
                    <div className='card mb-3'>

                      <div className='card-body img-body' style={{ height: '350px' }}>
                        <img alt="blog" src={post.better_featured_image.source_url} style={{ width: '100%', height: '100%' }}/>
                      </div>

                      <div className='card-header'>
                        <Link to={`/post/${post.id}`}>{post.title.rendered}</Link>
                      </div>

                      {post.content.rendered.length ? (
                        <div className='card-body'>
                          <div className='card-text post-content'>
                            {rednerHTML(post.content.rendered)}
                          </div>
                        </div>
                      ) : ''}
                      
                      <div className='card-footer'>
                        <Moment fromNow>{post.date}</Moment>
                        <Link className='btn btn-secondary float-right' to={`/post/${post.id}`}>Read more</Link>
                      </div>

                    </div>
                  </div>
                ))}
                </div>
            </div>
          ) : '' }
      </div>
    )
  }
}

export default Blog;
