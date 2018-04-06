const __ = require('./utils.js')

/**
 * Move centeroids (x, y)
 * to average(mean) of each data points assigned
 * 
 * @param {array} data 
 * @param {array} centeroids 
 * @param {int} n number of dimension
 */
const moveCenteroids = (data, centeroids, n) => {
    // loop through centeroids point
    for (let c = 0; c < centeroids.length; c++) {
        let obj = []
        let sumCount = 0
        // loop through dimensions
        for (let d = 0; d < n; d++) {
            sumCount = __.getSumCount(data, d, c, n)
            obj[d] = sumCount.sum / sumCount.count
        }
        centeroids[c] = obj
    }
}

module.exports = moveCenteroids