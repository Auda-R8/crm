import {createStore} from 'vuex'
import {Database} from "../data/Database";

const store = createStore({
    state() {
        return {
            activeUser: {
                email: '',
                name: ''
            }
        }
    },
    mutations: {
        setUser(state, user) {
            state.activeUser.email = user.email
            state.activeUser.name = user.name
        }
    },
    getters: {
        getUser(state) {
            return state.activeUser
        }
    }
})

export default store