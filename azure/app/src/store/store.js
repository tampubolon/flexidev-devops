import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

/* eslint-disable */
if (localStorage.getItem("principal") && JSON.parse(localStorage.getItem("principal")).token) {
	axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("principal")).token;
}

export default new Vuex.Store({
	state: {
		principal: (localStorage.getItem("principal") && JSON.parse(localStorage.getItem("principal"))) || {},
		notification: {
			title: null,
			content: {},
			show: false
		}
	},
	mutations: {
		login(state, principal) {
			state.principal = principal;
			axios.defaults.headers.common["Authorization"] = "Bearer " + principal.token;
			localStorage.setItem("principal", JSON.stringify(principal));
		},
	},
	actions: {
		login({ commit }, body) {
			const params = new URLSearchParams();
			params.append("email", body.email);
			params.append("password", body.password);

			return new Promise((resolve, reject) => {
				axios
					.post("/api/login", params, { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
					.then(response => {
						let principal = response.data;
						if (principal && principal.token) {
							commit("login", principal);
							resolve({ response: response, principal: principal });
						}
					})
					.catch(error => reject(error.message));
			});
		},
	},
	modules: {
	},
	getters: {
		isAuthenticated: state => state.principal && state.principal.token
	}
})
