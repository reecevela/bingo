var ghpages = require('gh-pages');

ghpages.publish('.', {
    branch: 'backend'
}, () => {});