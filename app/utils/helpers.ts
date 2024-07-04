import { SmallDateLocal } from "./const"

export const ConvertMinutesToHours = (time: number) => {
	const hours = Math.floor(time / 60)
	const minutes = time - hours * 60

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


export const FormattedDateUpcoming = (date: string) => {
	const newDate = date.split("-")
	const day = Number(newDate[2]) + 1
	const month = newDate[1]
	const year = newDate[0]
	const birthday = new Date(date).getTime()
	const currentTime = new Date().getTime()
	const age = currentTime - birthday
	const formatted = new Date(`${year}-${month}-${day}`).toLocaleDateString("es-MX", SmallDateLocal)
	return `${formatted} `
}

export const FormattedDateSearch = (date: string) => {
	const newDate = date.split("-")
	const day = Number(newDate[2].substring(0, 2)).toString().padStart(2, "0").replace(" ", "")
	const month = newDate[1].replace(" ", "")
	const year = newDate[0].replace(" ", "")

	return `${year}-${month}-${day} `
}

export const GetLatestYears = (defaultValue?: boolean) => {
	const propertiesYears: IPropertiesCombobox[] = []
	const currentYear = new Date().getFullYear()
	const numberYears = currentYear - 1873
	if (defaultValue) {
		propertiesYears.push({ option: "Mostrar todo", value: "" })
	}
	for (let index = 0; index < numberYears; index++) {
		propertiesYears.push({ option: (currentYear - index).toString(), value: (currentYear - index).toString() })
	}
	return propertiesYears
}


interface IPropertiesCombobox {
	option: string | number
	value: string
}