let fetch = require('fetch')
let redirect_url;
fetch.fetchUrl('http://www.google.com', (err, meta, body) => {
    if (body) {
        redirect_url = /URL=([^\"]*)/g.exec(body.toString())[1];
        console.log(redirect_url)
        process.env.CYPRESS_E2E_TARGET = redirect_url
    } else if (err) {
        console.log('Failed to retrieve "http://www.google.com". Is your internet turned on?')
        throw Error(err);
    } else {
        throw Error(err)
    }
});
