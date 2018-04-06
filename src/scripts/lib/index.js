const __ = require('./utils.js')
const getRandomCenteroids = require('./random-centeroids.js')
const doKMeans = require('./k-means.js')
const save = require('./save.js')
const papa = require('papaparse')

// Private variables
const PROPS = {
    K: 0,
    N: 0
}

/**
 * Initialize KMeans
 * 
 * @param {int} k 
 * @param {int} n 
 */
const init = (k, n) => {
    PROPS.K = k
    PROPS.N = n
}

/**
 * Load local file and do the K-Means
 * Supported extentions: csv, tsv, txt
 * 
 * @param {HTMLInput} input <input type="file">
 */
const doKMeansFromLocal = input => {
    papa.parse(input.files[0], {
        dynamicTyping: true,
        complete: function(results) {
            let data = results.data
            let centeroids = KMeans.getInitialCenteroids(data, PROPS.K) // dummy centeroids
            // let centeroids = [data[0], data[2], data[11]]
            KMeans.do(data, centeroids, PROPS) // doKMeans
            save(papa.unparse(data))
            console.log(data)
        }
    })
}

module.exports = {
    init: init,
    doFromLocal: doKMeansFromLocal,
    do: doKMeans,
    getInitialCenteroids: getRandomCenteroids,
    papa: papa
}