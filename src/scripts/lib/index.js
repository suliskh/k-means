/**
 *  ASSUMPTIONS
 * 
 *  1. Data have 2 dimension (x and y)
 * 
 */
const __ = require('./utils.js')
const assignCluster = require('./assign-cluster.js')
const moveCenteroids = require('./move-centeroids.js')
const getRandomCenteroids = require('./random-centeroids.js')
 // TODO: Load data

 
 // initialization
const K = 2
// const centeroids = [
//     // TODO: randomize each centeroids to input data
//     {x: 2, y:5}, 
//     {x: 4, y:2}
// ]





/**
 * Do K-Means clustering
 * Repeat until centeroids not moved
 * 
 * @param {array} data 
 * @param {array} centeroids 
 */
const doKMeans = (data, centeroids) => {
    let oCenteroids = []
    assignCluster(data, centeroids)
    moveCenteroids(data, centeroids, K)
    while (JSON.stringify(oCenteroids) !== JSON.stringify(centeroids)) {
        oCenteroids = centeroids
        assignCluster(data, centeroids)
        moveCenteroids(data, centeroids, K)
    }
    return data
}

module.exports = {
    do: function() {
        const data = [
            {x: 2, y: 5},
            {x: 4, y: 5},
            {x: 4, y: 2},
            {x: 2, y: 2},
            {x: 8, y: 5},
            {x: 10, y: 5},
            {x: 10, y: 2},
            {x: 8, y: 2},
            {x: 1, y: 4},
            {x: 11, y: 4},
        ]
        
        
        const centeroids = [data[1], data[2]]
        console.log(centeroids)
        console.log(doKMeans(data, centeroids))
    }
}