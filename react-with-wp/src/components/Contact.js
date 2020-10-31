import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

class Contact extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      WordPressSiteUrl: 'http://localhost:8888/vue-wp/admin',
      error: ''
    }

    this.create = this.create.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  
  create(e) {
    // add entity - POST
    e.preventDefault();
    
    fetch(`${this.state.WordPressSiteUrl}/wp-json/contact-form-7/v1/contact-forms/72/feedback`, {
      "method": "POST",
    //   "headers": {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODg4OFwvdnVlLXdwXC9hZG1pbiIsImlhdCI6MTYwMjk2NDYzMCwibmJmIjoxNjAyOTY0NjMwLCJleHAiOjE2MDM1Njk0MzAsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.2s0ewTxI3gZBHUyTeMBh90OwvfcmrE-kRk_aqCh-Gv8`
    //   },
      "body": JSON.stringify({
        yourname: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.setState({ error: response.message});
    })
    .catch(err => {
      console.log(err);
      this.setState({ error: err.message});
    });
  }

  

  handleChange(changeObject) {
    this.setState(changeObject)
  }


  render(){

    const { error } = this.state;
    return(
      <div>
        <Navbar />
            {error && <div className="alert alert-danger">{error}</div>}
          
            <div className='mt-5 container'>
              
              <form className="d-flex flex-column">
                <legend className="text-center">Contact Form</legend>
                <label htmlFor="name">
                  Name:
                  <input name="name"
                    id="name"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.handleChange({ name: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="email">
                  Email:
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={(e) => this.handleChange({ email: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="subject">
                  Subject:
                  <input
                    name="subject"
                    id="subject"
                    type="text"
                    className="form-control"
                    value={this.state.subject}
                    onChange={(e) => this.handleChange({ subject: e.target.value })}
                    />
                </label>
                <label htmlFor="message">
                  Message:
                  <textarea
                    name="message"
                    id="message"
                    type="text"
                    className="form-control"
                    value={this.state.message}
                    onChange={(e) => this.handleChange({ message: e.target.value })}
                    />
                </label>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                    Submit
                  </button>
                </div>
              </form>

            </div>
          
      </div>
    )
  }
}

export default Contact;
