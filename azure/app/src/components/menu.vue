<template>
	<v-app>
		<v-navigation-drawer app v-model="drawer" absolute temporary>
			<!-- <v-system-bar></v-system-bar> -->

			<v-list>
				<v-list-item>
					<v-list-item-avatar>
						<v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="text-h6 text-left"> {{ $store.state.principal.name }} </v-list-item-title>
						<v-list-item-subtitle class="text-left">{{ $store.state.principal.email }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list dense>
				<v-list-item to="/hello" link>
					<v-list-item-icon>
						<v-icon>mdi-home</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="text-left">Home</v-list-item-title>
				</v-list-item>

				<v-list-item to="/datatables" link>
					<v-list-item-icon>
						<v-icon>mdi-view-list</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="text-left">Data Tables</v-list-item-title>
				</v-list-item>

				<v-list-group :value="false" prepend-icon="mdi-account-circle">
					<template v-slot:activator>
						<v-list-item-title class="text-left">Users</v-list-item-title>
					</template>

					<v-list-group :value="false" no-action sub-group>
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title class="text-left">Admin</v-list-item-title>
							</v-list-item-content>
						</template>

						<v-list-item v-for="([title, icon], i) in admins" :key="i" link>
							<v-list-item-title v-text="title"></v-list-item-title>
							<v-list-item-icon>
								<v-icon v-text="icon"></v-icon>
							</v-list-item-icon>
						</v-list-item>
					</v-list-group>

					<v-list-group no-action sub-group>
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title class="text-left">Actions</v-list-item-title>
							</v-list-item-content>
						</template>

						<v-list-item v-for="([title, icon], i) in cruds" :key="i" link>
							<v-list-item-title v-text="title"></v-list-item-title>

							<v-list-item-icon>
								<v-icon v-text="icon"></v-icon>
							</v-list-item-icon>
						</v-list-item>
					</v-list-group>
				</v-list-group>
			</v-list>

			<template v-slot:append>
				<div class="pa-2">
					<v-btn block> Logout </v-btn>
				</div>
			</template>
		</v-navigation-drawer>

		<v-app-bar app absolute color="white" elevate-on-scroll scroll-target="#scrolling-techniques-7">
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>Title</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-heart</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>

		<!-- Sizes your content based upon application components -->
		<v-main>
			<router-view id="scrolling-techniques-7" class="overflow-y-auto" :key="$route.fullPath"></router-view>
		</v-main>

		<v-footer app>
			<!-- -->
		</v-footer>

		<!-- <img v-show="$root.loader.value" src="loader.svg" class="loader" /> -->
	</v-app>
</template>

<script>
export default {
	data: () => ({
		drawer: null,
		collapseOnScroll: true,
		admins: [
			["Management", "mdi-account-multiple-outline"],
			["Settings", "mdi-cog-outline"]
		],
		cruds: [
			["Create", "mdi-plus-outline"],
			["Read", "mdi-file-outline"],
			["Update", "mdi-update"],
			["Delete", "mdi-delete"]
		]
	})
};
</script>

<style>
/* .v-list .v-list-item--active {
	color: darkblue;
} */
</style>