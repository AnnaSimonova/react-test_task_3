import React, { Component } from 'react';
import axios from '../../../axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
      selectedPost: null,
    };

    componentDidMount() {
        this.dataLoaded();
    }

    componentDidUpdate() {
        this.dataLoaded();
    }

    dataLoaded() {
        if (this.props.match.params.id) {
            axios.get("/posts/" + this.props.match.params.id)
                .then(response => {
                        if (!this.state.selectedPost || (this.state.selectedPost.id !== response.data.id)) {
                            this.setState({selectedPost: response.data});
                        }
                    }
                );
        }
    }

    deletePostHandler = () => {
      axios.delete("/posts/" + this.props.match.params.id)
          .then(response =>
          console.log(response)
          )
    };

    render () {
        let post = <p className="FullPost" style={{padding:'2rem 0'}}>Please select a Post!</p>;

        if (this.state.selectedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.selectedPost.title}</h1>
                    <p>{this.state.selectedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;
