import { IErrorLogin, IResponseLogin, ISessionID } from "../interfaces/authentication"
import { CreateSession } from "../services/fetchData"
import { countryFlags, SmallDateLocal } from "./const"

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
	const [year, month, day] = date.split("-").map(Number);
	const birthDate = new Date(year, month - 1, day);
	const today = new Date();

	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	if (type === "small") {
		const formatted = birthDate.toLocaleDateString("es-MX", {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric'
		});
		return `${formatted} (${age} años)`;
	}

	// Formato "long" personalizado con la estructura exacta: 1 de junio de 1996
	const months = [
		"enero", "febrero", "marzo", "abril", "mayo", "junio",
		"julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
	];

	const dayNumber = birthDate.getDate();
	const monthName = months[birthDate.getMonth()];
	const yearNumber = birthDate.getFullYear();

	return `${dayNumber} de ${monthName} de ${yearNumber} (${age} años)`;
};

// Ejemplos de uso:
// FormattedDate("1996-06-01", "small") -> "1/6/1996 (30 años)"
// FormattedDate("1996-06-01", "long")  -> "1 de junio de 1996 (30 años)"


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

export function getCountryFromText(text: string) {
	if (!text || !countryFlags) return null;
	for (const item of countryFlags) {
		// Verificamos si alguna de las abreviaturas coincide en el texto
		const match = item.abbreviations.some(abbr => {
			// \b asegura que sea la palabra completa (evita falsos positivos)
			const regex = new RegExp(`\\b${abbr}\\b`, 'i');
			return regex.test(text);
		});

		if (match) {
			return {
				country: item.country,
				flag: item.flag
			};
		}
	}

	return null; // Si no encuentra ninguna coincidencia
}

export function getScoreColor(score: number): string {
	if (score >= 8) {
		return "#22C55E"; // Success (Verde)
	} else if (score >= 5.1) {
		return "#F59E0B"; // Warning (Amarillo/Naranja)
	} else {
		return "#EF4444"; // Danger (Rojo)
	}
}