const ecommerce = require('./Ecommerce');
const messaging = require('./messaging');
const posts = require('./Posts');
const profile = require('./Profile');

function delegateRoutesFor(app) {
    app.use('/api/ecommerce', ecommerce)
    app.use('/api/messaging', messaging)
    app.use('/api/posts', posts)
    app.use('/api/profile', profile)
}

module.exports = delegateRoutesFor;