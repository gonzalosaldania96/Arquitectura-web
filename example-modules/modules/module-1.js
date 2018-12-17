function Data



exports.db = new Database();



exports.getUserById = function(req, res) {

    var id = req.params.id;

    //var u = respository.get('users', id)

    res.send(u);
};

exports.getAllUser = function(req, res) {

};

