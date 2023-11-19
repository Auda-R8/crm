import {DateTime, Settings} from "luxon"
import axios from "axios"
export class Database {

    static _path = "src/data/data.json"

    // Старая реализация
    static async getFilters() {
        const response = await fetch(this._path)
        const data = await response.json()
        return data.datetime.timezones
    }

    static async getNow() {
        try {
            Settings.defaultLocale = await Database.getLocale()
            return DateTime.local().setZone(await Database.getTimezone() + '').toFormat(await Database.getFormat() + '')
        } catch (e) {
            console.error("Error fetching now: " + e)
        }
    }

    static async getLocale() {
        try {
            return (await (await fetch(this._path)).json()).settings.locale
        } catch (e) {
            console.error("Error fetching locale: " + e)
            throw e
        }
    }

    static async getTimezone() {
        try {
            return (await (await fetch(this._path)).json()).settings.timezone
        } catch (e) {
            console.error('Error fetching timezone: ' + e)
        }
    }

    static async getFormat() {
        try {
            return (await (await fetch(this._path)).json()).settings.format
        } catch (e) {
            console.error('Error fetching format: ' + e)
            throw e
        }
    }

    static async setFormat(newFormat) {
        try {
            axios.patch('http://localhost:3000/settings', {format: newFormat})
        } catch (e) {
            console.log('Error fetching format: ' + e)
            throw e
        }
    }


    static parse() {
    }
}