<template>
	<v-data-table
		:items = "contestList"
		:headers = "headers"
		:loading = "isLoading"
		hide-actions >
		<v-progress-linear
			slot = "progress"
			color = "primary"
			height = "5"
			indeterminate
		/>
		<template
			slot = "items"
			slot-scope = "props">
			<router-link
				:to = "{name: 'ContestDetail', params: {pk: props.item.pk }}"
				:style = "{cursor: 'pointer'}"
				tile
				tag = "tr">
				<td class="text-xs-center">{{ props.item.pk }}</td>
				<td class="text-xs-center">
					<span>{{ props.item.title }}</span>
				</td>
				<td class="text-xs-center">
					{{ props.item.settings.startTime | moment('Y-MM-DD HH:mm') }}
				</td>
				<td class="text-xs-center">
					{{ getTimeLength(props.item.settings.startTime, props.item.settings.endTime) }}
				</td>
				<td class = "text-xs-center blue--text text--darken-2">
					<strong>
						{{ getRunningStatus( props.item.settings.startTime , props.item.settings.endTime ) }}
						<span class = "ml-1 mr-1"> | </span>
						<v-icon
							small
							class = "postive"
							flat
						>
							mdi-account
						</v-icon>
						x {{ props.item.registerMemberNumber }}
					</strong>
				</td>
			</router-link>
		</template>
	</v-data-table>
</template>


<script>

import { mapGetters } from 'vuex';
import { getRunningStatus, getTimeLength } from '../utils';

export default {

	props: {
		contestList: {
			type: Array,
			default: () => ([]),
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			headers: [
				{
					text: '#',
					align: 'center',
					sortable: false,
				},
				{
					text: 'Title',
					align: 'center',
					sortable: false,
				},
				{
					text: 'Time',
					align: 'center',
					sortable: false,
				},
				{
					text: 'Length',
					align: 'center',
					sortable: false,
				},
				{
					text: 'Status',
					align: 'center',
					sortable: false,
				},
			],
		};
	},

	computed: {
		...mapGetters({
			hasPermission: 'user/hasPermission',
		}),
	},

	methods: {
		getRunningStatus(st, ed) {
			return getRunningStatus(st, ed);
		},
		getTimeLength(st, ed) {
			return getTimeLength(st, ed);
		},
	},
};
</script>
