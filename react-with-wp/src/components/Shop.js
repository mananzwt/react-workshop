import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from "@reach/router";
import rednerHTML from 'react-render-html';
import Oauth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import jQuery from "jquery";


const ck = "ck_9652234ce4717804781608d892748c56494ecb2b";
const cs = "cs_b7814dc666111d4c4157071dc3d9b12a79ab74b2";
const url = "http://localhost:8888/vue-wp/admin/wp-json/wc/v3/products/";

const oauth = Oauth({
    consumer: {
        key: ck,
        secret: cs
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, key) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
    }
});

const requestData = {
    url: url,
    method: 'GET'
};

class Shop extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      posts: [],
      WordPressSiteUrl: 'http://localhost:8888/vue-wp/admin',
      error: ''
    }
  }

  componentWillMount(){
    
    this.setState({loading: true}, () => {
        axios.get(requestData.url + '?' + jQuery.param(oauth.authorize(requestData)))
        .then(response => {
            console.log(response);
            this.setState({ error: response.message, posts: response.data});
        })
        .catch(err => {
            console.log(err);
            this.setState({ error: err.message});
        });
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
                <h1 className="text-center mb-20">Shop</h1>
                <div className='d-flex row'>
                
                {posts.map( post => (
                  <div key={ post.id } className='mb-30 col-md-4'>
                    <div className='card mb-3'>

                        <div className='card-body img-body' style={{ height: '350px' }}>
                            <img alt="blog" src={post.images[0].src} style={{ width: '100%', height: '100%' }}/>
                        </div>

                        <div className='card-header'>
                            <Link to={`/shop/${post.slug}`}>{post.name}</Link>
                            
                        </div>

                        {/* <div className='card-body'>
                            <div className='card-text post-content'>
                            {rednerHTML(post.content.rendered)}
                            </div>
                        </div> */}

                        <div className='card-footer d-flex align-items-center justify-content-between'>
                            {rednerHTML(post.price_html)}
                            <Link className='btn btn-secondary float-right' to={`/?add-to-cart=${post.id}`}>Buy Now</Link>
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

export default Shop;
