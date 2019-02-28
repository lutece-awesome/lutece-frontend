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
				:to = "{name: 'Home' }"
				:style = "{cursor: 'pointer'}"
				tile
				tag = "tr">
				<td class="text-xs-center">{{ props.item.pk }}</td>
				<td class="text-xs-center">
					<span>{{ props.item.title }}</span>
				</td>
				<td class="text-xs-center">
					{{ getRunningStatus( props.item.settings.startTime , props.item.settings.endTime ) }}
				</td>
				<td class="text-xs-center">
					{{ props.item.settings.startTime | moment('Y-MM-DD HH:mm') }}
				</td>
				<td class="text-xs-center">
					{{ getTimeLength(props.item.settings.endTime, props.item.settings.startTime) }}
				</td>
			</router-link>
		</template>
	</v-data-table>
</template>


<script>

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
					text: 'Status',
					align: 'center',
					sortable: false,
					class: 'hidden-sm-and-down',
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
			],
		};
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
