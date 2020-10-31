import React, { Component } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';

class Navbar extends Component {

  constructor(props){
    super(props);
    this.state = {
      pages: [],
      WordPressSiteUrl: 'http://localhost:8888/vue-wp/admin',
      error: ''
    }
  }

  componentDidMount(){
    this.setState({loading: true}, () => {
      axios.get(`${this.state.WordPressSiteUrl}/wp-json/wp/v2/pages`)
      .then(res=> {
        console.warn(res.data);
        this.setState({loading: false, pages: res.data})
      })
      .catch(error => this.setState({loading: false, error: error.response.data.message}))
    });
  }

  render(){

    const { pages, error } = this.state;

    return(
      <nav className="navbar navbar-expand-lg navbar-light">

        <div className="header-logo">
          <Link className="nav-link" to="/">
            <img src="https://staging.zealousweb.com/wp-content/uploads/2020/10/zealousweb-dark-logo.svg" alt="Logo"/>
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="navbarColor01">

          <ul className="navbar-nav mr-auto">

            {/* {error && <div className="alert alert-danger">{error}</div>}
            {pages.map( page => (

              <li key={ page.id } className="nav-item active">
                <Link className="nav-link" to={page.slug + '/' +page.id}>{page.title.rendered}</Link>
              </li>
            ))} */}

            <li className="nav-item active">
              <Link className="nav-link" to="/">Home </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/shop">Shop </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/our-work/52">Our Work </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/about/36">About </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/post-create/2">Post Create </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/blog">Blog </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/contact">Contact </Link>
            </li>

          </ul>

        </div>
      </nav>
    )
  }
}

export default Navbar;
