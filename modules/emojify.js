/**
 * @author thanh.dc
 * @deps jQuery
 */
var template = require('../template')
    , _ = require('underscore')
    , emojies = require('../data/emoji');

var Emojify = function(config) {
    config = config || {};
    
    this.emojies = emojies;
    this.emojiClass = config.emojiClass || 'g-emoji';
    this.staticPath = config.staticPath || 'http://static.gate.local.vn/emoji/';
    this.target = config.target || false;
    this.onSelect = config.onSelect || this.onSelect;
    
    this.loadCss();
    this.renderHtml();
    this.bindEvent();
};

/**
 * Load my css
 * @returns {undefined}
 */
Emojify.prototype.loadCss = function() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = template.emojifyCss;
    document.getElementsByTagName('head')[0].appendChild(style);
};

Emojify.prototype.renderHtml = function() {
    var div = document.createElement('div');
        div.innerHTML = _.template(template.emojify, {
            emojies: this.emojies,
            emojiClass: this.emojiClass,
            staticPath: this.staticPath
        });
    document.getElementsByTagName('body')[0].appendChild(div);
};

Emojify.prototype.bindEvent = function() {
    var _this = this;
    if(this.target) {
        $(this.target).bind('click', function(e){
            e.preventDefault();
            var pos = $(_this.target).offset();
            $('#emojify').css({
                'top': pos.top - 220,
                'left': pos.left - 200
            }).toggle();
        });
    }
    
    $('#emojify .tabs').find('li').bind('click', function(){
        $(this).siblings('.active').removeClass('active')
        $(this).addClass('active');
        
        // Get data-rel
        var rel = $(this).data('rel');
        $('*[data-id='+rel+']').siblings('.active').removeClass('active');
        $('*[data-id='+rel+']').addClass('active');
    });
    
    $('#emojify .tab-container').find('li').bind('click', function(){
        var code = $(this).find('.' + _this.emojiClass).data('code');
        _this.onSelect(code);
        _this.hidePopup();
    });
};

/**
 * Find an emoji object by emoji code
 * @param {type} code
 * @returns {Emojify.prototype.find.emoji|Number}
 */
Emojify.prototype.find = function(code) {
    var _this = this,
        emoji = undefined;
    
    _.each(_.keys(this.emojies), function(key){
        if(emoji !== undefined) return false;
        emoji = _.findWhere(_this.emojies[key], {"code": code});
        if(emoji !== undefined) {
            emoji.g = key;
        }
    });
    
    return emoji;
};

/**
 * Parse string which contain emoji code into html string
 * @param {type} str
 * @returns {unresolved}
 */
Emojify.prototype.parse = function(str) {
    var matches = str.match(/(:.*?:)/g);
        matches = matches || []; // Valid matches data
    
    for(var i = 0; i < matches.length; i++) {
        // Find match emoji
        var emoji = this.find(matches[i]);
        // Verified input text like emji code
        if(emoji === undefined) continue;
        // Replace emoji code with html
        str = str.replace(matches[i], this.emojiToHtml(emoji));
    }
    
    return str;
};

/**
 * Render an emoji object to html
 * @param {type} emoji
 * @returns {unresolved}
 */
Emojify.prototype.emojiToHtml = function(emoji) {
    return _.template('<img width="30" height="30" src="<%= src %>" />', {
        src: this.staticPath + emoji.g + '/' + emoji.src
    });
};

/**
 * Please override this function
 * @param {type} emoji
 * @returns {undefined}
 */
Emojify.prototype.onSelect = function(emoji) {
    console.log(emoji);
};

/**
 * Hide emoji popup
 * @returns {undefined}
 */
Emojify.prototype.hidePopup = function() {
    $('#emojify').hide();
};

// Export Emojify module
module.exports = Emojify;
