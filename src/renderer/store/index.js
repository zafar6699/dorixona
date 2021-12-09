import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import { createPersistedState } from "vuex-electron";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        token: "",
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        logout(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {
        async login({ commit }, user) {
            await axios
                .post("http://localhost:8080/api/auth/login", user)
                .then(async (res) => {
                    console.log(res.data.data);
                    await commit("setToken", res.data.data);
                    localStorage.setItem("token", res.data.data);
                    await axios({
                        method: "GET",
                        url: "http://localhost:8080/api/auth/me",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }).then(async (user) => {
                        await commit("setUser", user.data.data);
                    });
                });
        },
        async logOut({ commit }) {
            let user = null;
            commit("logout", user);
        },
    },
    plugins: [createPersistedState()],

    getters: {
        isAuthenticated: (state) => !!state.user,
    },
});

export default store;
