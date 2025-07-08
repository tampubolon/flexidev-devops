<template>
	<v-app>
		<router-view :key="$route.fullPath"></router-view>

		<!-- <duoFooter /> -->

		<!-- <v-dialog v-model="$store.state.notification.show" width="500">
			<v-card class="white">
				<v-card-title style="background-color:#9d0039;" class="py-0">
					<v-row>
						<v-col cols="4"></v-col>
						<v-col cols="4">
							<v-img color="white" height="100" :src="$bucket + '/image/warning.svg'" contain></v-img>
						</v-col>
						<v-col cols="4" class="d-flex px-0">
							<v-spacer></v-spacer>
							<v-btn icon color="white" @click="hideNotification">
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-card-title>
				<v-card-text class="pa-3" style="text-align:center;">
					<span class="title">Warning</span>
					<br />
					<br />
					<template v-if="$store.state.notification.content && $store.state.notification.content.type == 'NOTIFICATION'">
						<div style="font-size:14px;" :key="item" v-for="item in $store.state.notification.content.fieldErrorList">{{ item }}</div>
						<div style="font-size:14px;" :key="item" v-for="item in $store.state.notification.content.errorList">{{ item }}</div>
						<div style="font-size:14px;" :key="item" v-for="item in $store.state.notification.content.noticeList">{{ item }}</div>
					</template>
					<template v-else>
						<div style="font-size:14px;">{{ $store.state.notification.content }}</div>
					</template>
				</v-card-text>
				<v-card-actions class="justify-center pb-6">
					<v-btn @click="hideNotification" class="duo-primary ml-2 mr-2 btn-width-custom">Got it!</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog> -->

		<!-- <img v-show="$root.loader.value" src="loader.svg" class="loader" /> -->
	</v-app>
</template>

<script>
// import duoFooter from "./duoFooter.vue";

export default {
	// components: {
	// 	duoFooter
	// },
	methods: {
		hideNotification() {
			// this.$store.commit("hideNotification");
		}
	}
};
</script>