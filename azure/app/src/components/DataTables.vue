<template>
	<v-container fluid>
		<v-col>
			<h1 style="text-align: center">Datatable with 3rd Party API</h1>
			<v-data-table
				:footer-props="{
					'items-per-page-options': [2, 10, 50]
				}"
				:items-per-page="2"
				:headers="headers"
				:items="data"
				:options.sync="options"
				:server-items-length="serverItemsLength"
				:loading="loading"
				:sort-by.sync="sortBy"
				:sort-desc.sync="sortDesc"
			>
				<template v-slot:item.logo="{ item }">
					<img :src="item.airline.logo" style="width: 10%" />
				</template>
				<template v-slot:item.website="{ item }">
					<a :href="item.airline.website">{{ item.airline.website }}</a>
				</template>
			</v-data-table>
		</v-col>
	</v-container>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			loading: true,
			data: [],
			options: {},
			headers: [
				{ text: "ID", value: "id" },
				{ text: "Name", value: "name" },
				{ text: "Email", value: "email" },
				{ text: "Active", value: "active" }
			],
			sortBy: "id",
			sortDesc: false,
			serverItemsLength: 0
		};
	},
	//this one will populate new data set when user changes current page.
	watch: {
		options: {
			handler() {
				this.readDataFromAPI();
			}
		},
		deep: true
	},
	methods: {
		//Reading data from API method.
		readDataFromAPI() {
			this.loading = true;
			const { sortBy, sortDesc, page, itemsPerPage } = this.options;
			let pageNumber = page - 1;
			axios.get("/api/person/datatables?itemsPerPage=" + itemsPerPage + "&page=" + pageNumber + "&sortBy=" + sortBy + "&sortDesc=" + sortDesc).then(response => {
				//Then injecting the result to datatable parameters.
				this.loading = false;
				this.data = response.data.data;
				this.serverItemsLength = response.data.size;
			});
		}
	},
	//this will trigger in the onReady State
	mounted() {
		this.readDataFromAPI();
	}
};
</script>

<style>
</style>