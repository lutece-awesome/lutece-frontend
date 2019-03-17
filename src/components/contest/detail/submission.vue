<template>
	<v-container fiuld>
		<v-data-table
			:items = "statusItem"
			:loading = "isLoading > 0"
			:headers-length = "8"
			hide-actions
		>
			<v-progress-linear
				slot = "progress"
				height = "2"
				color = "grey"
				indeterminate
			/>
			<template
				slot = "headers"
			>
				<tr
					justify-center
					align-center
				>
					<th
						headers-length = "2"
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center pt-3"
						style = "width: 14.2%"
					>
						User
					</th>
					<th
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center pt-3"
						style = "width: 14.2%"
					>
						<v-select
							v-model = "problem"
							:items = "problemList"
							item-text = "title"
							item-value = "slug"
							class = "mt-1"
							persistent-hint
							return-object
							single-line
						/>
					</th>
					<th
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center"
						style = "width: 14.2%"
					>
						<verdict-select
							v-model = "verdict"
						/>
					</th>
					<th
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center pt-3 hidden-sm-and-down"
						style = "width: 14.2%"
					>
						Time (ms)
					</th>
					<th
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center pt-3 hidden-sm-and-down"
						style = "width: 14.2%"
					>
						Memory (KiB)
					</th>
					<th
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center pt-3 hidden-sm-and-down"
						style = "width: 14.2%"
					>
						Submit Time
					</th>
					<th
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center hidden-sm-and-down"
						style = "width: 14.2%"
					>
						<language-select v-model = "language"/>
					</th>
				</tr>
			</template>
			<template
				slot = "items"
				slot-scope = "props">
				<tr
					style = "cursor: pointer"
					tile
					@click = "querySubmission(props.item.pk)"
				>
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
					<td class = "text-xs-center">
						<router-link
							:to = "{ name: 'ContestSpecifyProblem' ,
								params: {id: titleToIdx.get(props.item.problem.title) } }"
						>
							{{ titleToIdx.get(props.item.problem.title) }} - {{ props.item.problem.title }}
						</router-link>
					</td>
					<td
						:class = "props.item.result.color + '--text'"
						class = "text-xs-center">
						{{ props.item.result.status }}
						<span v-if = "props.item.failedCase">#{{ props.item.failedCase }}</span>
					</td>
					<td class="text-xs-center hidden-sm-and-down">{{ props.item.attachInfo.timeCost }}</td>
					<td class="text-xs-center hidden-sm-and-down">{{ props.item.attachInfo.memoryCost }}</td>
					<td class="text-xs-center time hidden-sm-and-down">
						<span class="humanize-time">{{ props.item.createTime | moment("from") }}</span>
						<span class="full-time">{{ props.item.createTime | moment("Y-MM-DD HH:mm:ss") }}</span>
					</td>
					<td class="text-xs-center hidden-sm-and-down">{{ props.item.language }}</td>
				</tr>
			</template>
		</v-data-table>
		<div
			:class = "{'mb-2': $vuetify.breakpoint.xsOnly}"
			class = "text-xs-center mt-2">
			<v-pagination
				v-model = "page"
				:length = "maxPage"/>
		</div>
		<submission-dialog
			v-model = "dialog"
			:pk = "queryPk"
			:contest = "contest"
		/>
	</v-container>
</template>

<script>

import UserAutoComplete from '@/components/user/utils/auto-complete';
import ProblemAutoComplete from '@/components/problem/utils/auto-complete';
import LanguageSelect from '@/components/language/utils/select';
import VerdictSelect from '@/components/verdict/utils/select';
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';
import SubmissionDialog from '../submission/detail';

export default {

	components: {
		UserAutoComplete,
		ProblemAutoComplete,
		LanguageSelect,
		VerdictSelect,
		SubmissionDialog,
	},

	props: {
		contest: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			isLoading: 0,
			statusItem: [],
			user: null,
			problem: null,
			verdict: null,
			language: null,
			page: 1,
			maxPage: 0,
			titleToIdx: new Map(),
			problemList: [],
<<<<<<< HEAD
			dialog: false,
			queryPk: null,
=======
>>>>>>> [Contest]: Add problem routing.
		};
	},

	watch: {
		user() {
			this.debounceFetchData();
		},
		problem() {
			this.debounceFetchData();
		},
		verdict() {
			this.debounceFetchData();
		},
		language() {
			this.debounceFetchData();
		},
		page() {
			this.debounceFetchData();
		},
	},

	mounted() {
		this.fetchData();
		this.debounceFetchData = debounce(this.fetchData, this.debounce);
	},

	created() {
		for (let i = 0; i < this.contest.problems.length; i += 1) {
			this.titleToIdx.set(this.contest.problems[i].title, String.fromCharCode(65 + i));
		}
		this.problemList.push({
			title: 'All',
		});
		for (let i = 0; i < this.contest.problems.length; i += 1) {
			const each = this.contest.problems[i];
			this.problemList.push({
				title: `${String.fromCharCode(65 + i)} - ${each.title}`,
				slug: each.slug,
			});
		}
		if (this.problemList.length > 0) {
			[this.problem] = this.problemList;
		}
	},

	methods: {
		init() {
			this.debounceFetchData();
		},

		fetchData() {
			this.isLoading += 1;
			const query = gql`
				query ContestSubmissionList(
					$pk: ID!,
					$page: Int!
					$user: String
					$problem: String
					$judgeStatus: String
					$language: String
				) {
					contestSubmissionList(
						pk: $pk
						page: $page
						user: $user
						problem: $problem
						judgeStatus: $judgeStatus
						language: $language
					) {
						maxPage
						submissionList {
							pk
							failedCase
							createTime
							user {
								username
								attachInfo{
									gravatar
								}
							}
							problem {
								title
								slug
							}
							result{
								status
								color
							}
							language
							attachInfo{
								timeCost
								memoryCost
							}
						}
					}
				}`;
			this.$apollo.query({
				query,
				variables: {
					pk: this.contest.pk,
					page: this.page,
					problem: this.problem.title !== 'All' ? this.problem.slug : null,
					judgeStatus: this.verdict ? this.verdict.full : null,
					language: this.language ? this.language.full : null,
				},
				fetchPolicy: 'no-cache',
			})
				.then(response => response.data.contestSubmissionList)
				.then((data) => {
					this.maxPage = data.maxPage;
					this.statusItem = data.submissionList;
				})
				.finally(() => {
					this.isLoading -= 1;
				});
		},

		querySubmission(pk) {
			this.queryPk = pk;
			this.dialog = true;
		},

		getSubmitSubmission(pk) {
			const iaf = this.page === 1;
			this.page = 1;
			if (iaf) {
				this.debounceFetchData();
			}
			this.queryPk = pk;
			this.dialog = true;
		},
	},
};
</script>
