export const state = () => ({
    isLoggedIn: false,
    user: null
})

export const getters = {
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user
}

export const mutations = {
    setLoggedIn(state, value) {
        state.isLoggedIn = value
    },
    setUser(state, user) {
        state.user = user
    }
}

export const actions = {
    async login({ commit }, { email, password }) {
        try {
            const res = await this.$axios.post(process.env.API_URL + '/api/auth/local', {
                identifier: email,
                password: password
            })
            if (!res.data) return false;
            const { jwt, user } = res.data
            window.localStorage.setItem('jwt', jwt)
            window.localStorage.setItem('userData', JSON.stringify(user))
            commit('setLoggedIn', true)
            commit('setUser', user)
            return true;
        } catch (error) {
            console.log("ERROR AUTH")
            console.log(error)
            return false;
        }
    },
    async logout({ commit }) {
        window.localStorage.removeItem('jwt')
        window.localStorage.removeItem('userData')
        commit('setLoggedIn', false)
        commit('setUser', null)
        return true;
    }
}
