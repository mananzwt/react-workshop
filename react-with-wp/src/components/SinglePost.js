import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import rednerHTML from 'react-render-html';
import Moment from 'react-moment';

class SinglePost extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            post: {},
            error: ''
        }
    }

    componentDidMount(){
        
        const WordPressSiteUrl = 'http://localhost:8888/vue-wp/admin';
        this.setState({loading: true}, () => {
          axios.get(`${WordPressSiteUrl}/wp-json/wp/v2/posts/${this.props.id}`)
          .then(res=> {
            console.warn(res.data);
            this.setState({loading: false, post: res.data})
          })
          .catch(error => this.setState({loading: false, error: error.response.data.message}))
        });
      }

    render(){

        const { post, error } = this.state;
        console.log(post);
        return(
            <div>
                <Navbar />
                { error && <div className="alert alert-danger">{error}</div> }
                { Object.keys( post ).length ? (
                    <div className='mt-5 container'>
                        <div className='d-flex row'>
                        
                            <div key={ post.id } className='mb-3 col-md-12'>

                                <div className='card mb-3'>

                                <div className='card-header'>
                                    <h1>{post.title.rendered}</h1>
                                </div>

                                <div className='card-body img-body'>
                                    <img alt="single post" src={post.better_featured_image.source_url} style={{ width: '100%' }}/>
                                </div>

                                <div className='card-body'>
                                    <div className='card-text post-content'>
                                        {rednerHTML(post.content.rendered)}
                                    </div>
                                </div>
                                                                
                                <div className='card-footer'>
                                    <Moment fromNow>{post.date}</Moment>
                                </div>

                                </div>
                            </div>
                        
                        </div>
                    </div>
                ) : '' }
            </div>
        )
    }
}

export default SinglePost;