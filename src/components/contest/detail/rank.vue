<template>
	<v-container fiuld>
		<v-data-table
			:items = "renderingRankingList"
			:loading = "isLoading > 0"
			:headers-length = "3 + problemLength"
			hide-actions
		>
			<v-progress-linear
				slot = "progress"
				height = "2"
				color = "grey"
				indeterminate
			/>
			<template slot = "headers">
				<tr
					justify-center
					align-center

				>
					<th
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center"
						style = "width: 10%"
					>
						#
					</th>
					<th
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center"
						style = "width: 20%"
					>
						Team
					</th>
					<th
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center"
						style = "width: 10%"
					>
						Penalty
					</th>
					<th
						v-for = "(each , index) in problemLength"
						:key = "index"
						:style = "{ width: 60 / problemLength + '%' }"
						role = "columnheader"
						scope = "col"
						class = "column text-xs-center"
					>
						{{ String.fromCharCode( 65 + index ) }}
					</th>
				</tr>
			</template>
			<template
				slot = "items"
				slot-scope = "{ item , index }">
				<tr tile>
					<td class = "text-xs-center nowrap">
						{{ index }}
					</td>
					<td class = "text-xs-center">
						{{ item.name }}
					</td>
					<td class = "text-xs-center">
						{{ item.penalty }}
					</td>
					<td
						v-for = "(each , index) in problemLength"
						:key = "index"
						class = "text-xs-center"
					>
						{{ item.details[index].tried }}
					</td>
				</tr>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>

import gql from 'graphql-tag';
import Verdict from '@/modules/verdict/main';
import { getMinutesBetweenTwo } from '../utils';

export default {
	props: {
		pk: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			isLoading: 0,
			renderingRankingList: [],
			problemLength: 0,
		};
	},

	mounted() {
		this.fetchData();
	},

	methods: {
		fetchData() {
			const query = gql`
				query ContestRankingList( $pk: ID!){
					contestRankingList(pk: $pk){
						submissions{
							status
							createTime
							team
							slug
						}
						problems{
							slug
						}
						meta{
							startTime
						}
					}
				}
			`;
			this.isLoading += 1;
			this.$apollo.query({
				query,
				variables: {
					pk: this.pk,
				},
			})
				.then(response => response.data.contestRankingList)
				.then((data) => {
					this.updateRenderingList(data.submissions, data.problems, data.meta);
				})
				.finally(() => {
					this.isLoading -= 1;
				});
		},

		updateRenderingList(submissions, problems, meta) {
			if (!submissions || !problems || !meta) {
				return;
			}
			const slugToIdx = new Map();
			const minimumSolvedTime = new Map();
			for (let i = 0; i < problems.length; i += 1) {
				slugToIdx.set(problems[i].slug, i);
				minimumSolvedTime.set(i, Infinity);
			}
			const arr = [];
			const teamnameToPos = new Map();
			const { startTime } = meta;
			submissions.forEach((each) => {
				const { status, team, createTime } = each;
				const idx = slugToIdx.get(each.slug);
				let teamIndex = null;
				if (!teamnameToPos.get(team)) {
					teamnameToPos.set(team, arr.length);
					teamIndex = arr.length;
					arr.push({
						name: team,
						solved: 0,
						penalty: 0,
						details: new Array(problems.length).map(() => ({
							solved: false,
							tried: 0,
							firstBlood: false,
							solvedTime: null,
						})),
					});
				} else {
					teamIndex = teamnameToPos.get(team);
				}
				const teamRef = arr[teamIndex];
				const isSolved = teamRef.details[idx].solved;
				if (!isSolved) {
					if (status === Verdict.ac.full) {
						teamRef.penalty += getMinutesBetweenTwo(startTime, createTime);
						teamRef.penalty += 20 * teamRef.details[idx].tried;
						teamRef.solved += 1;
						teamRef.details[idx].solved = true;
						teamRef.solvedTime = new Date(createTime);
						minimumSolvedTime.set(idx, Math.min(minimumSolvedTime.get(idx), new Date(createTime)));
					} else {
						teamRef.details[idx].tried += 1;
					}
				}
			});
			arr.forEach((each) => {
				for (let i = 0; i < each.details.length; i += 1) {
					const status = each.details[i];
					if (status.solved && status.solvedTime === minimumSolvedTime.get(i)) {
						status.firstBlood = true;
					}
				}
			});
			arr.sort((a, b) => (a.solved < b.solved || (a.solved === b.solved && a.penalty < b.penalty)));
			this.problemLength = problems.length;
			this.renderingRankingList = arr;
		},
	},
};
</script>
