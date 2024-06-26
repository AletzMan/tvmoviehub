import { SmallDateLocal } from "./const"

export const ConvertMinutesToHours = (time: number) => {
	const hours = Math.floor(time / 60)
	const minutes = time - hours * 60
	console.log(hours, minutes)
	return `${hours}h ${minutes}m`
}

export const FormattedDate = (date: string, type: "small" | "long") => {
	const newDate = date.split("-")
	const day = Number(newDate[2]) + 1
	const month = newDate[1]
	const year = newDate[0]
	const birthday = new Date(date).getTime()
	const currentTime = new Date().getTime()
	const age = currentTime - birthday
	const formatted = new Date(`${year}-${month}-${day}`).toLocaleDateString("es-MX", SmallDateLocal)
	const years = Math.floor(((((age / 1000) / 60) / 60) / 24) / 365)
	return `${formatted} (${years} años)`
}