/**
 * Compute euclidian distance
 * 
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 * @return {number}
 */
const getEuclidianDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

/**
 * Compute sum and count of data assigned some cluster
 * 
 * @param {array} data 
 * @param {int} cluster index of cluster in centeroids array
 * @param {string} param dimension: x or y
 * @return {obj} {sum: number, count: number}
 */
const getSumCount = (data, cluster, param) => data.reduce((acc, val) => {
    if (val.c == cluster) {
        acc.sum += val[param]
        acc.count++
    }
    return acc
}, {sum: 0, count: 0})

module.exports = {
    getEuclidianDistance: getEuclidianDistance,
    getSumCount: getSumCount
}