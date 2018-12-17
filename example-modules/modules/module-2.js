module.exports = function(id, name) {

    this.id = id;
    this.name = name;

};

module.exports.prototype.getName = function() {

    return this.name;

};

