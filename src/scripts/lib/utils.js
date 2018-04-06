/**
 * Compute euclidian distance of 2 data points
 * 
 * @param {array} x
 * @param {array} y
 * @param {int} n // number of dimension
 * @return {number}
 */
const getEuclidianDistance = (x, y, n) => {
    let sum = 0
    for (let i = 0; i < n; i++) sum += Math.pow(x[i] - y[i], 2)
    return Math.sqrt(sum)
}

/**
 * Compute sum and count of data assigned some cluster
 * 
 * @param {array} data 
 * @param {int} d index of dimension
 * @param {int} c index of cluster in centeroids array
 * @param {int} n number of dimension, data[n+1] is centeroid property
 * @return {obj} {sum: number, count: number}
 */
const getSumCount = (data, d, c, n) => data.reduce((acc, val) => {
    if (val[n+1] == c) {
        acc.sum += val[d]
        acc.count++
    }
    return acc
}, {sum: 0, count: 0})

module.exports = {
    getEuclidianDistance: getEuclidianDistance,
    getSumCount: getSumCount
}