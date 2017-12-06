import Timestrap from './Timestrap'

const decode = words => {
    try {
        words = decodeURIComponent(words)
    } catch (e) {
    }
    return words
}

export default value => {
	return Timestrap(value)
		|| decode(value)
		|| value
}
