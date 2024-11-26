import { IErrorLogin, IResponseLogin, ISessionID } from "../interfaces/authentication"
import { CreateSession } from "../services/fetchData"
import { SmallDateLocal } from "./const"

export const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
})

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

export const ValidateLogin = async (username: string, password: string) => {
	let errorName = ""
	let errorPassword = ""
	if (username === "" || password === "") {
		errorName = username === "" ? "Campo obligatorio" : ""
		errorPassword = password === "" ? "Campo obligatorio" : ""

		const errors: IResponseLogin = {
			success: false,
			status_code: 1,
			status_message: "Campo obligatorio",
			session_id: "",
			error_username: errorName,
			error_password: errorPassword
		}
		return errors

	} else {
		const responseSession = await CreateSession(username, password)
		if (responseSession.success) {
			const sessionID = responseSession as ISessionID
			const response: IResponseLogin = {
				success: true,
				status_code: 0,
				status_message: "Inicio de sesión con éxito",
				session_id: sessionID.session_id,
				error_username: "",
				error_password: ""
			}
			return response
		}
		const errorLogin = responseSession as IErrorLogin
		const response: IResponseLogin = {
			success: false,
			status_code: errorLogin.status_code,
			status_message: errorLogin.status_message,
			session_id: "",
			error_username: "",
			error_password: ""
		}
		return response
	}
}