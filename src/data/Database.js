import {DateTime, Settings} from "luxon"
import axios from "axios"


export class Database {

    static _path = "src/data/data.json"

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

            await axios.patch('http://localhost:3000/settings', {format: newFormat})

            axios.patch('http://localhost:3000/settings', {format: newFormat})
        } catch (e) {
            console.log('Error fetching format: ' + e)
            throw e
        }
    }


    static async loginUser(email, password) {
        try {
            const users = (await (await fetch(this._path)).json()).users
            return users.some(elem => email === elem.email && password === elem.password)
        } catch (e) {
            console.error("Error login: " + e)
            throw e
        }
    }

    static async getActiveUser() {
        try {
            return (await (await fetch(this._path)).json()).activeUser
        } catch (e) {
            console.error("Error of returning: " + e)
            throw e
        }
    }

    static async setActiveUser(email) {
        try {
            const users = (await (await fetch(this._path)).json()).users
            const user = users.find(elem => elem.email === email)

            await axios.patch("http://localhost:3000/activeUser", {
                "email": user.email,
                "name": user.name,
                "password": user.password
            })
        } catch (e) {
            console.log("Error of fetching: " + e)
            throw e
        }
    }
}