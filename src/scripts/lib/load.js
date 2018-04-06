const papa = require('papaparse')

const load = input => {
    papa.parse(input.files[0], {
        complete: function(results) {
            console.log(results)
            return results;
        },
        error: function(error, result) {
            console.error(error)
        }
    })
    // return null
}

module.exports = load

