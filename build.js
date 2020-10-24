var ghpages = require('gh-pages');

ghpages.publish('dist', {
	branch: 'main'
}, function(err) {});