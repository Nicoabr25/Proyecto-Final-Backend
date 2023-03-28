export function nextID(arr) {
    if (arr.length === 0) {
        return 0;
    } else {
        const highestId = arr.reduce((acc, curr) => {
            return curr.id > acc ? curr.id : acc;
        }, 0)
        return highestId + 1;
    }
}