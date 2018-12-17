
function ClientsService() {

    console.log('Init user service');

    this._clients = [

        {id: 1, nombre: 'Diego', edad:20 },
        {id: 2, nombre: 'Agustin', edad: 22 },
        {id: 3, nombre: 'Alvaro', edad:24 }

    ];

};


/**
 * @return {Promise<any>}
 */
ClientsService.prototype.getAll = function() {

    return new Promise((resolve) => {

        resolve(this._clients);
    });

};


/**
 * @param id
 * @return {Promise<any>}
 */
ClientsService.prototype.getById = function(id) {

    return new Promise((resolve, reject) => {

        let client = this._clients.find(c => c.id == id);

        if(client) {

            resolve(client);

        } else {

            reject(id);
        }

    });

};


/**
 * @param client
 */
ClientsService.prototype.add = function(client) {

    this._clients.push(client);
};


/**
 * @param id
 */
ClientsService.prototype.deleteById = function(id) {

    this._clients = this._clients.filter(c => c.id != req.params.id);
};


module.exports = new ClientsService();


