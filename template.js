var fs = require('fs');

module.exports = {
    emojify: fs.readFileSync(__dirname + '/template/emojify.html', 'utf8'),
    emojifyCss: fs.readFileSync(__dirname + '/template/emoji.css', 'utf8')
};