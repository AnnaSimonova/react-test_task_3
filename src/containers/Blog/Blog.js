import React, { Component } from 'react';
import axios from '../../axios';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import {Route} from 'react-router';
import {NavLink, Switch, Redirect} from 'react-router-dom';

import './Blog.css';

class Blog extends Component {
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
                this.setState({error: true});
            });
    }

    render () {
        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact activeClassName="my-active" activeStyle={{color:'#fa923f', textDecoration:'underline'}}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post"
                                // ,
                                // hash: "#submit",
                                // search: "?quick-submit=true"
                            }}>New post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path='/new-post' component={NewPost}/>
                    <Route path='/posts' component={Posts}/>
                    <Redirect from='/' to='/posts'/>
                </Switch>
            </div>
        );
    }
}

export default Blog;
