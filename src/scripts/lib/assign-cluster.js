const __ = require('./utils.js')

/**
 * Compute euclidian distance and assign cluster for each data points
 * 
 * @param {array} data 
 * @param {array} centeroids 
 * @param {int} n number of dimension
 */
const assignCluster = (data, centeroids, N) => {
    let nearestCenteroid = 0
    let euclidian = 0
    for (let i = 0; i < data.length; i++) {
        nearestCenteroid = 0
        data[i][N] = Infinity // distance
        // determine minimum distance and choose cluster
        for (let j = 0; j < centeroids.length; j++) {
            // compute distance
            euclidian = __.getEuclidianDistance(centeroids[j], data[i], N)
            // 
            if (euclidian < data[i][N]) {
                nearestCenteroid = j
                data[i][N] = euclidian
            }            
        }
        // assign cluster
        data[i][N+1] = nearestCenteroid 
    }
}

module.exports = assignCluster