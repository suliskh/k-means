/**
 * UNDERSTANDING
 * 
 * N: number of dimensions
 * K: K factor
 * 
 * for each data points:
 *      data_point[0]: 1st attribute
 *      data_point[1]: 2nd attribute
 *      .
 *      .
 *      .
 *      data_point[N-1]: last attribute
 *      data_point[N]: distance from current centeroid/cluster
 *      data_point[N+1]: cluster
 * 
 */


// Entry point for browserify
// Available globally with name "KMeans"
module.exports = require('./lib')