const assignCluster = require('./assign-cluster.js')
const moveCenteroids = require('./move-centeroids.js')

/**
 * Do K-Means clustering
 * Repeat until centeroids not moved
 * 
 * @param {array} data 
 * @param {array} centeroids 
 * @param {Object} props
 */
const doKMeans = (data, centeroids, props) => {
    let oCenteroids = []
    assignCluster(data, centeroids, props.N)
    moveCenteroids(data, centeroids, props.N)
    while (JSON.stringify(oCenteroids) !== JSON.stringify(centeroids)) {
        oCenteroids = centeroids
        assignCluster(data, centeroids, props.N)
        moveCenteroids(data, centeroids, props.N)
    }
}

module.exports = doKMeans