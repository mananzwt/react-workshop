import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

class PostCreate extends Component {

  constructor(props){
    super(props);
    this.state = {
      friends: [],
      name: '',
      id: '',
      notes: '',
      WordPressSiteUrl: 'http://localhost:8888/vue-wp/admin',
      error: ''
    }

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  
  create(e) {
    // add entity - POST
    e.preventDefault();
    
    fetch(`${this.state.WordPressSiteUrl}/wp-json/wp/v2/posts/`, {
      "method": "POST",
      "headers": {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODg4OFwvdnVlLXdwXC9hZG1pbiIsImlhdCI6MTYwMjk2NDYzMCwibmJmIjoxNjAyOTY0NjMwLCJleHAiOjE2MDM1Njk0MzAsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.2s0ewTxI3gZBHUyTeMBh90OwvfcmrE-kRk_aqCh-Gv8`
      },
      "body": JSON.stringify({
        title: this.state.name,
        content: this.state.notes
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

  
  update(e) {
    // update entity - PUT
    e.preventDefault();  

    fetch(`${this.state.WordPressSiteUrl}/wp-json/wp/v2/posts/${this.state.id}`, {
      "method": "PUT",
      "headers": {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODg4OFwvdnVlLXdwXC9hZG1pbiIsImlhdCI6MTYwMjk2NDYzMCwibmJmIjoxNjAyOTY0NjMwLCJleHAiOjE2MDM1Njk0MzAsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.2s0ewTxI3gZBHUyTeMBh90OwvfcmrE-kRk_aqCh-Gv8`
      },
      "body": JSON.stringify({
        _id: this.state.id,
        title: this.state.name,
        post_status: 'publish',
        content: this.state.notes
      })
    })
    .then(response => response.json())
    .then(response => { 
      console.log(response);
      this.setState({ error: response.message});
    })
    .catch(err => { 
      console.log('13');
      console.log(err); 
      this.setState({ error: err.message});
    });
  }

  delete(e) {
    // delete entity - DELETE
    e.preventDefault();  

    fetch(`${this.state.WordPressSiteUrl}/wp-json/wp/v2/posts/${this.state.id}`, {
      "method": "DELETE",
      "headers": {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODg4OFwvdnVlLXdwXC9hZG1pbiIsImlhdCI6MTYwMjk2NDYzMCwibmJmIjoxNjAyOTY0NjMwLCJleHAiOjE2MDM1Njk0MzAsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.2s0ewTxI3gZBHUyTeMBh90OwvfcmrE-kRk_aqCh-Gv8`
      }
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
                <legend className="text-center">Add-Update-Delete Post</legend>
                <label htmlFor="name">
                  Post Name:
                  <input name="name"
                    id="name"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={(e) => this.handleChange({ name: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="notes">
                  Post Content:
                  <textarea
                    name="notes"
                    id="notes"
                    type="test"
                    className="form-control"
                    value={this.state.notes}
                    onChange={(e) => this.handleChange({ notes: e.target.value })}
                    required
                    />
                </label>
                <label htmlFor="id">
                  Post ID:
                  <input
                    name="id"
                    id="id"
                    type="text"
                    className="form-control"
                    value={this.state.id}
                    onChange={(e) => this.handleChange({ id: e.target.value })}
                    />
                </label>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary" type='button' onClick={(e) => this.create(e)}>
                    Add
                  </button>
                  <button className="btn btn-info" type='button' onClick={(e) => this.update(e)}>
                      Update
                  </button>
                  <button className="btn btn-danger" type='button' onClick={(e) => this.delete(e)}>
                      Delete
                  </button>
                </div>
              </form>

            </div>
          
      </div>
    )
  }
}

export default PostCreate;
