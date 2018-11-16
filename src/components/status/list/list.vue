<template>
	<v-data-table
		:items = "statusItem"
		:loading = "isLoading"
		:headers-length = "8"
		hide-actions >
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
		<template
			slot="headers"
			slot-scope="props">
			<tr>
				<th
					role="columnheader"
					scope="col"
					class="column text-xs-center">
					<v-text-field
						:value = "pk"
						label = "#"
						single-line
						hide-details
						type = "number"
						min = "1"
						step = "1"
						style = "width: 30px"
						@input = "$emit( 'input-pk' , $event )"
					/>
				</th>
				<th
					role = "columnheader"
					scope = "col"
					class = "column text-xs-center">
					<ApolloQuery
						:query = "require('@/graphql/user/search.gql')"
						:variables = "{ user }"
						:debounce = "300"
					>
						<template
							slot-scope = "{ result: { loading, error , data } }">
							<v-autocomplete
								:value = "user"
								:items = "data ? data.userSearch.userList.map( each => each.username ) : []"
								:loading = "loading || !data"
								single-line
								hide-details
								clearable
								label = "User"
								style = "width: 50px"
								item-text = "name"
								dense
								@input = "$emit( 'input-user' , $event )"
							/>
						</template>
					</ApolloQuery>
				</th>
				<!-- <th
					role="columnheader"
					scope="col"
					class="column text-xs-center">
					<v-autocomplete
						v-model = "filters.problem"
						:items = "problemSearch.items"
						:loading = "problemSearch.isLoading"
						:search-input.sync = "problemSearch.filter"
						:append-icon = "null"
						single-line
						hide-details
						clearable
						label="Problem"
						style="width: 80px"
						item-text="name"
						dense
					/>
				</th>
				<th
					role = "columnheader"
					scope = "col"
					class = "column text-xs-center">
					<v-select
						v-model = "filters.judgeStatus"
						:items = "verdictItems"
						label = "Verdict"
						single-line
						hide-details
						dense
						clearable
						offset-y
						style="width: 120px"
					/>
				</th> -->
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
					<!-- <th
					role = "columnheader"
					scope = "col"
					class = "column text-xs-center hidden-sm-and-down">
					<v-select
						v-model = "filters.language"
						:items = "languageItems"
						label = "Lang"
						single-line
						hide-details
						dense
						clearable
						offset-y
						style = "width: 60px"
					/>
				</th> -->
			</tr>
		</template>
	</v-data-table>
</template>


<script>
export default {
	props: {
		statusItem: {
			type: Array,
			default: () => [],
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		pk: {
			type: Number,
			default: null,
		},
		user: {
			type: String,
			default: null,
		},
		problem: {
			type: String,
			default: null,
		},
		judgeStatus: {
			type: String,
			default: null,
		},
		language: {
			type: String,
			default: null,
		},
	},
	data: () => ({
		problemTitle: '',
		verdictItems: [
			'Pending',
			'Preparing',
			'Accepted',
			'Running',
			'Compile Error',
			'Wrong Answer',
			'Runtime Error',
			'Time Limit Exceeded',
			'Output Limit Exceeded',
			'Memory Limit Exceeded',
			'Judger Error',
		],
		languageItems: [
			'GNU G++',
			'GNU GCC',
			'Python',
			'Java',
			'Go',
			'Ruby',
			'Rust',
		],
	}),
	computed: {
		getUser() {
			return this.user;
		},
	},
};
</script>
