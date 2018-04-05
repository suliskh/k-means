const __ = require('./utils.js')

/**
 * Move centeroids (x, y)
 * to average(mean) of each data points assigned
 * 
 * @param {array} data 
 * @param {array} centeroids 
 * @param {int} K
 */
const moveCenteroids = (data, centeroids, K) => {
    for (let i = 0; i < K; i++) {
        let sumCountX = __.getSumCount(data, i, "x")
        let sumCountY = __.getSumCount(data, i, "y")
        let obj = {
            x: sumCountX.sum / sumCountX.count,
            y: sumCountY.sum / sumCountY.count
        }
        centeroids[i] = obj
    }
}

module.exports = moveCenteroids