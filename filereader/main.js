const fs = require("fs", "utf8");

// REQUEST IO: ............
//1

fs.readFile("./readme.txt", function(err, data) {

    if(err) {

        // catch err

        console.log("Error: " + err );

        return;
    }

    // 3

    console.log(data);

});


// 2

console.log('hola');


