/**
 * return a random integer between 0 and max_value
 * @param {number} max_value 
 * @returns {number} random integer between 0 and max_value
 */
function getRandomInt(max_value) {
    return Math.floor(Math.random() * Math.floor(max_value));
}

/**
 * return a divided by b, floored
 * @param {Number} a number to be divided
 * @param {Number} b number to divide by
 * @returns {Number} a divided by b, floored
 */
function divideAndFloor(a, b) {
    return Math.floor(a / b);
}
