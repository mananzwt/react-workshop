import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import rednerHTML from 'react-render-html';

class About extends Component {

  constructor(props){
    super(props);
    this.state = {
      post: {},
      WordPressSiteUrl: 'http://localhost:8888/vue-wp/admin',
      error: ''
    }
  }

  componentDidMount(){
    this.setState({loading: true}, () => {
      axios.get(`${this.state.WordPressSiteUrl}/wp-json/wp/v2/pages/${this.props.id}`)
      .then(res=> {
        console.warn(res.data);
        this.setState({loading: false, post: res.data})
      })
      .catch(error => this.setState({error: error.response.data.message}))
    });
  }

  render(){

    const { post, error } = this.state;

    return(
      <div>
        <Navbar />
          {error && <div className="alert alert-danger">{error}</div>}
          
            <div className='mt-5 container'>
              <div className='d-flex'>
              { Object.keys( post ).length ? (
                  <div key={ post.id } className='mb-30 row'>
                    <div className='mb-3 col-md-12'>

                        <div className='card-header'>
                            <h1>{post.title.rendered}</h1>
                        </div>

                        <div className='card-body'>
                          <div className='card-text post-content'>
                            {rednerHTML(post.content.rendered)}
                          </div>
                        </div>                                                            

                    </div>

                    <div className='left-content col-md-6'>
                        {rednerHTML(post.acf.left_content)}
                    </div>

                    <div className='left-content col-md-6' style={{ height: '300px' }}>
                        <img alt="about us" src={post.acf.right_image} style={{ width: '100%', height: '100%' }}/>
                    </div>

                  </div>
                ) : '' }
                </div>
            </div>
          
      </div>
    )
  }
}

export default About;
