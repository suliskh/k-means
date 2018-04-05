/**
 * Get randomize initial centeroids
 * from data points
 * 
 * @param {array} data 
 * @param {int} K 
 * @return {array} centeroids
 */
const getRandomCenteroids = (data, K) => {
    let centeroids = []
    for (let i = 0; i < K; i++) {
        centeroids[i] = data[Math.floor(Math.random() * data.length)]
    }
    return centeroids
}

module.exports = getRandomCenteroids
