const __ = require('./utils.js')

/**
 * Compute euclidian distance and assign cluster for each data points
 * 
 * @param {array} data 
 * @param {array} centeroids 
 */
const assignCluster = (data, centeroids) => {
    let nearestCenteroid = 0
    let euclidian = 0
    for (let i = 0; i < data.length; i++) {
        nearestCenteroid = 0
        data[i].d = 0
        for (let j = 0; j < centeroids.length; j++) {
            // assign cluster
            euclidian = __.getEuclidianDistance(data[i].x, data[i].y, centeroids[j].x, centeroids[j].y)
            if (euclidian > data[i].d) {
                nearestCenteroid = j
                data[i].d = euclidian
            }            
        }
        data[i].c = nearestCenteroid
    }
}

module.exports = assignCluster