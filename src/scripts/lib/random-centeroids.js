/**
 * Get randomize initial centeroids
 * from data points
 * 
 * @param {array} data 
 * @param {int} k
 * @return {array} centeroids
 */
const getRandomCenteroids = (data, k) => {
    let centeroids = []
    for (let i = 0; i < k; i++) {
        centeroids[i] = data[Math.floor(Math.random() * data.length)]
    }
    return centeroids
}

module.exports = getRandomCenteroids
