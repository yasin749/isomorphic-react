import axios from 'axios';

function getAllBlogs() {
    return axios.get('https://jsonplaceholder.typicode.com/posts');
}

export {
    getAllBlogs,
}
