/**
 * Returns a deep copy of the given object
 * @param {object} object 
 * @returns {object}
 */
export default function deepCopy(object) {
    return JSON.parse(JSON.stringify(object))
}