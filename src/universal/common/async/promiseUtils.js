function resolve(promise) {
    return promise.catch(function (result) {
        console.log('Error: ', result);
        return result;
    });
}

export {
    resolve,
};
