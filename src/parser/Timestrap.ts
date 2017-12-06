
const REG = [/^15\d{8}$/, /^15\d{11}$/]

export default value => {
	let d
	if (REG[0].test(value)) {
		d = new Date()
		d.setTime(value * 1000)
	} else if (REG[1].test(value)) {
		d = new Date()
		d.setTime(Number(value))
	}
	if (d) {
		return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
	}
}