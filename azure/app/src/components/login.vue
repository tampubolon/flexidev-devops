<template>
	<v-main>
		<v-row no-gutters align="center" justify="center" class="fill-height">
			<div class="text-center">
				<v-row no-gutters justify="center" align="center">
					<v-card style="width: 476px" class="rounded-lg card-login" raised color="rgba(255, 255, 255, 0.75) !important">
						<div class="card-login-head">
							<v-icon>mdi-person</v-icon>
						</div>
						<div style="margin: 32px 0 15px 0px; padding: 0px 40px">
							<v-form ref="form" autocomplete="off">
								<h2 class="pt-0" style="font-size: 28px !important">Login</h2>

								<v-text-field
									v-model="email"
									class="pt-0"
									type="email"
									label="Email"
									:rules="[v => !!v || 'Please enter your registered email address', v => (v && v.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && true) || 'Please enter a valid email address']"
									v-on:keyup.enter="$refs.refPassword.focus()"
									style="margin-top: 30px; font-size: 17px !important"
									:class="{ 'line-blue': email != '' && email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) }"
								></v-text-field>

								<v-text-field
									ref="refPassword"
									label="Password"
									type="password"
									style="font-size: 17px !important"
									:class="{ 'line-blue': password != null && password != '' }"
									:rules="[v => !!v || 'Please enter your password']"
									v-model="password"
									v-on:keyup.enter="login"
								></v-text-field>

								<v-col cols="12" class="d-flex flex-column pa-0 pt-2" align-self="center">
									<v-row no-gutters class="mb-4" justify="center">
										<v-btn class="btn-login elevation-0" @click="login()">Login</v-btn>
									</v-row>
								</v-col>
							</v-form>
						</div>
					</v-card>
				</v-row>
			</div>
		</v-row>
	</v-main>
</template>

<script>
/* eslint-disable no-console */
import axios from "axios";

export default {
	data: function () {
		return {
			email: "",
			password: "",
			rememberMe: false,
			passwordType: true,
			error: { show: false, content: "" }
		};
	},
	methods: {
		doRememberMe() {},
		login() {
			if (this.$refs.form.validate()) {
				this.$store
					.dispatch("login", {
						email: this.email,
						password: this.password
					})
					.then(response => {
						this.$router.push({
							path: "hello"
						});
					})
					.catch(error => {
						console.log("error: ", error);
					});
			}
		}
	}
};
</script>

<style>
</style>Î