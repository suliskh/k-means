/**
 *  ASSUMPTIONS
 * 
 *  1. Data have 2 dimension (x and y)
 * 
 */

const data = [
    {x: 2, y: 5},
    {x: 4, y: 5},
    {x: 4, y: 2},
    {x: 2, y: 2},
    {x: 8, y: 5},
    {x: 10, y: 5},
    {x: 10, y: 2},
    {x: 8, y: 2},
    {x: 11, y: 4},
    {x: 1, y: 4},
]

const centeroids = [
    {x: 2, y:5},
    {x: 4, y:2}
]

// cluster assignments
// move centroids
const euclidianDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

const assignCluster = (data, centereoids) => {
    let nearestCenteroid = 0
    let euclidian = 0
    for (let i = 0; i < data.length; i++) {
        nearestCenteroid = 0
        data[i].d = 0
        for (let j = 0; j < centeroids.length; j++) {
            // assign cluster
            euclidian = euclidianDistance(data[i].x, data[i].y, centeroids[j].x, centereoids[j].y)
            if (euclidian > data[i].d) {
                nearestCenteroid = j
                data[i].d = euclidian
            }            
        }
        data[i].c = nearestCenteroid
    }
}
// Get 
const getSumCount = (data, cluster, param) => data.reduce((acc, val) => {
    if (val.c == cluster) {
        acc.sum += val[param]
        acc.count++
    }
    return acc
}, {sum: 0, count: 0})

// return {x: ,y: }
const moveCenteroids = (data, centeroids) => {
    // let newCenteroids = []
    for (let i = 0; i < centeroids.length; i++) {
        let sumCountX = getSumCount(data, i, "x")
        let sumCountY = getSumCount(data, i, "y")
        let obj = {
            x: sumCountX.sum / sumCountX.count,
            y: sumCountY.sum / sumCountY.count
        }
        centeroids[i] = obj
    }
}

const doKMeans = (data, centeroids) => {
    // TODO: Looping till not same
    // let next = true
    // let newCenteroids = []
    
    // while(next == true) {
    //     console.log('hi')
    //     assignCluster(data, centeroids)
    //     moveCenteroids(data, centeroids)
    //     if (JSON.stringify(newCenteroids) === JSON.stringify(centeroids)) next = false
    // }

    // return data
    
}
module.exports = {
    do: function() {
        // [EXPERIMENT]
        assignCluster(data, centeroids)
        moveCenteroids(data, centeroids)

        assignCluster(data, centeroids)
        moveCenteroids(data, centeroids)

        assignCluster(data, centeroids)
        moveCenteroids(data, centeroids)

        assignCluster(data, centeroids)
        moveCenteroids(data, centeroids)

        console.warn(centeroids)
        console.log(data)
        // console.log(JSON.stringify({x: 1, y: 2}) === JSON.stringify({x: 1, y: 2}))
    }
}