import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import rednerHTML from 'react-render-html';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      post: {},
      WordPressSiteUrl: 'http://localhost:8888/vue-wp/admin',
      heroBanners: [],
      error: ''
    }
  }
  
  componentDidMount(){
    this.setState({loading: true}, () => {
      axios.get(`${this.state.WordPressSiteUrl}/wp-json/wp/v2/pages/27`)
      .then(res=> {
        console.warn(res.data);
        this.setState({loading: false, heroBanners: res.data.acf.hero_banner, post: res.data})
      })
      .catch(error => this.setState({loading: false, error: error.response.data.message}))
    });
  }

  render(){
    
    const { post, heroBanners ,error } = this.state;
    var settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    return(
      <div>
        <Navbar />
          {error && <div className="alert alert-danger">{error}</div>}
          
          <div className='hero-banner'>
            <Slider {...settings}>
              {heroBanners.map( heroBanner => (

                <div key={post.id} className='mb-30 banner-inner' style={{position: "relative", width: '100%'}}>
                  <img src={heroBanner.hero_image} style={{ width: '100%', height: '100%' }}/>
                  
                  <div className='banner-caption d-flex flex-align-center flex-justify-start '>
                    <div className='container'>
                      <div className='content-inside'>
                        <h1>{heroBanner.hero_title}</h1>
                        {rednerHTML(heroBanner.hero_content)}
                      </div>
                    </div>
                  </div>

                </div>
                
              ))}
            </Slider>
          </div>

      </div>
    )
  }
}

export default Home;
