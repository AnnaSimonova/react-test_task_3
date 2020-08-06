import React, {Component} from 'react';
import axios from "../../../axios";
import Post from '../../../components/Post/Post';
import {Route, Switch} from "react-router";
import FullPost from "../FullPost/FullPost";
// import classes from './Posts.module.css';

// import {Link} from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: []
    };

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                    const posts = response.data.slice(0, 4);
                    const updatedPosts = posts.map(posts => {
                        return {
                            ...posts,
                            author: 'Max'
                        }
                    });
                    this.setState({
                        posts: updatedPosts,
                        selectedPost: updatedPosts[0].id
                    });
                }
            )
            .catch(error => {
                // this.setState({error: true});
            });
        console.log(this.props.match.url);
    }

    selectFullPost(post) {
        this.props.history.push(this.props.match.url+'/'+post.id);
        this.setState({
            selectedPost: post.id
        });
    };

    render() {
        let posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author} clicked={this.selectFullPost.bind(this, post)} />
            //*<Link to={'/'+post.id} key={post.id}>*/}

            // </Link>
        });

        if (this.state.error) {
            posts = <p>Wooops! Something wrong happened</p>
        }

        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;
