
export default () => {
    const name = localStorage.getItem('name')

    if (name) {
        return true
    }
    return false
}