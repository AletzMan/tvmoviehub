/*import 'server-only'
 
const dictionaries = {
  en: () => import('../../public/locale/en.json').then((module) => module.default),
  es: () => import('../../public/locale/es.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string) => dictionaries[locale]()*/

type Dictionary = Record<string, string>

const dictionaries: Record<string, () => Promise<Dictionary>> = {
	en: () => import("../../public/locale/en.json").then((module) => module.default),
	es: () => import("../../public/locale/es.json").then((module) => module.default),
}

export const getDictionary = async (locale: keyof typeof dictionaries): Promise<Dictionary> => {
	return dictionaries[locale]()
}
