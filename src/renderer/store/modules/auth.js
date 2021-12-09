import axios from "axios";
const state = {
    user: null,
    token: "",
};
const mutations = {
    setUser(state, username) {
        state.user = username;
    },

    logOut(state) {
        state.user = null;
    },
};

const actions = {
    async logIn({ commit }, User) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", User);
        await axios
            .post("http://localhost:8080/api/auth/login", User)
            .then((res) => {
                console.log("wwww", res);
                commit("setUser", res.data);
            })
            .catch((error) => {});
    },
    async logOut({ commit }) {
        let user = null;
        commit("logOut", user);
    },
};

const getters = {
    isAuthenticated: (state) => !!state.user,
    stateUser: (state) => state.user,
};

export default {
    state,
    getters,
    actions,
    mutations,
};
