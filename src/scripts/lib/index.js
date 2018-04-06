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
const load = require('./load.js')
 // TODO: Load data

 
 // initialization
const K = 2
// const centeroids = [
//     // TODO: randomize each centeroids to input data
//     {2,5}, 
//     {4,2}
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
            [2, 5],
            [4, 5],
            [4, 2],
            [2, 2],
            [8, 5],
            [10, 5],
            [10, 2],
            [8, 2]
        ]
        
        // const centeroids = getRandomCenteroids(data, 2)
        let centeroids = [data[0], data[2]]
        console.log(centeroids[0], centeroids[1])
        console.log("------------------------------")
        let bla = doKMeans(data, centeroids)

        bla.forEach(element => {
            console.log(element)
        });
    },
    load: function(input) {
        load(input)
    }
}