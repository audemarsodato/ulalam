
// make a checkMissingFields function for checking all request input
function checkMissingFields(fields) {
        const missingFields = []

        // if a string use .trim
        // dont use .trim when its an array or object

        for (const [key, value] of Object.entries(fields)) {
                if (typeof value === 'string') {
                        if (!value.trim()) missingFields.push(key)
                        }
                
                if (value === undefined || value === null) {
                        missingFields.push(key)
                }
        }

        return missingFields
}

module.exports = {
        checkMissingFields
}