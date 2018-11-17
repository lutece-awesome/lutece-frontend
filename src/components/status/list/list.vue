<template>
	<v-data-table
		:items = "statusItem"
		:loading = "isLoading"
		:headers-length = "8"
		hide-actions >
		<v-progress-linear
			slot = "progress"
			color = "primary"
			height = "5"
			indeterminate
		/>
		<template
			slot="headers"
			slot-scope="props">
			<tr>
				<th
					role="columnheader"
					scope="col"
					class="column text-xs-center">
					<v-text-field
						label = "#"
						single-line
						hide-details
						type = "number"
						min = "1"
						step = "1"
						@input = "$emit( 'input-pk' , $event )"
					/>
				</th>
				<th
					role = "columnheader"
					scope = "col"
					class = "column text-xs-center">
					<user-auto-complete
						style = "padding-top: 20px"
						label = "User"
						@input = "$emit( 'input-user' , $event )"/>
				</th>
				<th
					role="columnheader"
					scope="col"
					class="column text-xs-center">
					<problem-auto-complete
						style = "padding-top: 20px"
						label = "Problem"
						@input = "$emit( 'input-problem' , $event )" />
				</th>
				<th
					role = "columnheader"
					scope = "col"
					class = "column text-xs-center">
					<verdict-select
						@input = "$emit( 'input-verdict' , $event )"
					/>
				</th>
				<th
					role = "columnheader"
					scope = "col"
					class = "column text-xs-center pt-3 hidden-sm-and-down">
					Time (ms)
				</th>
				<th
					role = "columnheader"
					scope = "col"
					class = "column text-xs-center pt-3 hidden-sm-and-down">Memory (KiB)</th>
				<th
					role = "columnheader"
					scope = "col"
					class = "column text-xs-center pt-3 hidden-sm-and-down">Submit Time</th>
				<th
					role = "columnheader"
					scope = "col"
					class = "column text-xs-center hidden-sm-and-down">
					<language-select
						@input = "$emit( 'input-language' , $event )"
					/>
				</th>
			</tr>
		</template>
		<template
			slot = "items"
			slot-scope = "props">
			<router-link
				:to = "{name: 'StatusDetail', params: {pk: props.item.pk}}"
				style = "cursor: pointer"
				tile
				tag = "tr">
				<td class="text-xs-center">{{ props.item.pk }}</td>
				<td class="text-xs-center nowrap">
					<router-link
						:to = "{ name: 'UserDetail' , params: {username: props.item.user.username } }"
						tag = "span"
					>
						<v-avatar
							size="32"
							class="mr-1" >
							<img :src = "props.item.user.attachInfo.gravatar" >
						</v-avatar>
						{{ props.item.user.username }}
					</router-link>
				</td>
				<td class="text-xs-center">
					<router-link
						:to = "{ name: 'ProblemDetailDescription' , params: {slug: props.item.problem.slug } }"
					>
						{{ props.item.problem.title }}
					</router-link>
				</td>
				<td
					:class = "props.item.result.color + '--text'"
					class = "text-xs-center">
					{{ props.item.result.status }}
					<span v-if="props.item.failedCase">#{{ props.item.failedCase }}</span>
				</td>
				<td class="text-xs-center hidden-sm-and-down">{{ props.item.attachInfo.timeCost }}</td>
				<td class="text-xs-center hidden-sm-and-down">{{ props.item.attachInfo.memoryCost }}</td>
				<td class="text-xs-center time hidden-sm-and-down">
					<span class="humanize-time">{{ props.item.createTime | moment("from") }}</span>
					<span class="full-time">{{ props.item.createTime | moment("Y-MM-DD HH:mm:ss") }}</span>
				</td>
				<td class="text-xs-center hidden-sm-and-down">{{ props.item.language }}</td>
			</router-link>
		</template>
	</v-data-table>
</template>

<script>

import UserAutoComplete from '@/components/user/utils/auto-complete';
import ProblemAutoComplete from '@/components/problem/utils/auto-complete';
import LanguageSelect from '@/components/language/utils/select';
import VerdictSelect from '@/components/verdict/utils/select';

export default {
	components: {
		UserAutoComplete,
		ProblemAutoComplete,
		LanguageSelect,
		VerdictSelect,
	},
	props: {
		statusItem: {
			type: Array,
			default: () => [],
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
