import axios from 'axios';

// import blogs from './blogs';

function getAllBlogs() {
    return axios.get('https://jsonplaceholder.typicode.com/posts');
    /* Failover
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(blogs);
        }, 300);
    })*/
}

export {
    getAllBlogs,
}
