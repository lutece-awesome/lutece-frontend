<template>
	<v-container>
		<v-layout
			row
			wrap
		>
			<v-flex xs5>
				<v-layout
					fill-height
					align-center
					justify-center
					ma-0
				>
					<v-img
						:src = "user.gravataremail"
						height = "128"
						contain
					>
						<LoadingSpinner slot = "placeholder" />
					</v-img>
				</v-layout>
			</v-flex>
			<v-flex
				class = "pl-4"
				xs7
			>
				<table class = "about-card-table">
					<tr>
						<td> <v-icon small> mdi-emoticon-cool </v-icon> </td>
						<td> {{ user.name }} </td>
					</tr>
					<tr>
						<td> <v-icon small > mdi-octagram </v-icon> </td>
						<td> {{ user.company }} </td>
					</tr>
					<tr>
						<td> <v-icon small > mdi-lighthouse-on </v-icon> </td>
						<td> {{ user.title }} </td>
					</tr>
					<tr>
						<td> <v-icon small> mdi-map-marker </v-icon> </td>
						<td> {{ user.location }} </td>
					</tr>
				</table>
			</v-flex>
		</v-layout>
</v-container></template>


<script>

import LoadingSpinner from '@/components/basic/loadingspinner';

export default {
	components: {
		LoadingSpinner,
	},
	props: {
		user: {
			type: Object,
			default: null,
		},
	},
};
</script>
