import React, {PureComponent} from 'react';

import {resolve} from '../../common/async/promiseUtils';

import {getAllBlogs} from '../../services/blog/blogService';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import BlogBoxList from '../../components/Blog/Box/List/BlogBoxList';

import s from './home-page.scss';

class HomePage extends PureComponent {

    /*static async fetchData() {
        let serverData = {};

        await resolve(
            getAllBlogs().then((data) => {
                serverData.blogs = data.data;
            })
        );

        return serverData;
    }*/

    constructor(props) {
        super(props);

        const {initialState} = props;

        this.state = {
            blogs: initialState && initialState.blogs,
        };
    }

    componentDidMount() {
        /*const {
            blogs,
        } = this.state;*/

        //if (!blogs) {
        resolve(
            getAllBlogs().then((data) => {
                this.setState({
                    blogs: data.data,
                })
            })
        );
        //}
    }

    render() {
        const {
            blogs,
        } = this.state;

        return (
            <MainLayout className={s.root}>
                <h1>My Blog</h1>
                <BlogBoxList
                    blogs={blogs}/>
            </MainLayout>
        );
    }
}

export default HomePage;
