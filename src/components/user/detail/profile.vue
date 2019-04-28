<template>
	<div>
		<v-layout
			row
			wrap>
			<v-flex xs12>
				<v-img
					:src="user.attachInfo.gravatar"
					height="200"
					contain>
					<loading-spinner slot="placeholder" />
				</v-img>
			</v-flex>
			<v-flex
				xs12
				class="mt-3">
				<v-hover>
					<v-card
						slot-scope="{ hover }"
						:class="`elevation-${hover ? 4 : 1}`">
						<v-container>
							<v-layout
								row
								wrap>
								<v-flex xs12>
									<div class="headline font-weight-medium ml-1"> {{ user.username }} </div>
									<v-divider class="mt-2 mb-2" />
									<table class="profile-table">
										<tr>
											<td>Last Seen</td>
											<td>
												<v-tooltip bottom>
													<span slot="activator">
														<span>
															{{ user.lastLoginDate | moment("from") }}
														</span>
													</span>
													<span>
														{{ user.lastLoginDate | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
													</span>
												</v-tooltip>
											</td>
										</tr>
										<tr>
											<td>Registered</td>
											<td>
												<v-tooltip bottom>
													<span slot="activator">
														<span>
															{{ user.joinedDate | moment("from") }}
														</span>
													</span>
													<span>
														{{ user.joinedDate | moment( "MMMM Do, YYYY" ) }}
													</span>
												</v-tooltip>
											</td>
										</tr>
										<tr v-if="user.attachInfo.school">
											<td>School</td>
											<td>{{ user.attachInfo.school }}</td>
										</tr>
										<tr v-if="user.attachInfo.company">
											<td>Company</td>
											<td>{{ user.attachInfo.company }}</td>
										</tr>
										<tr v-if="user.attachInfo.location">
											<td>Location</td>
											<td>{{ user.attachInfo.location }}</td>
										</tr>
										<tr v-if="user.attachInfo.codeforces">
											<td>Codeforces</td>
											<td>{{ user.attachInfo.codeforces }}</td>
										</tr>
										<tr v-if="user.attachInfo.atcoder">
											<td>Atcoder</td>
											<td>{{ user.attachInfo.atcoder }}</td>
										</tr>

										<tr v-if="user.attachInfo.gender">
											<td>Gender</td>
											<td> Male </td>
										</tr>
										<tr v-else>
											<td>Gender</td>
											<td> Female</td>
										</tr>

										<!-- <tr>
											<td>Social</td>
											<td>
												<img
													:src = "require('@/assets/github.svg')"
													height = "24"
												>
												<img
													:src = "require('@/assets/zhihu.svg')"
													height = "24"
													class = "ml-2"
												>
												<img
													:src = "require('@/assets/weibo.svg')"
													height = "24"
													class = "ml-2"
												>
												<img
													:src = "require('@/assets/linkedin.svg')"
													height = "24"
													class = "ml-2"
												>
											</td>
										</tr> -->
										<tr v-if="user.attachInfo.about">
											<td>About</td>
											<td>{{ user.attachInfo.about }}</td>
										</tr>
									</table>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card>
				</v-hover>
			</v-flex>
		</v-layout>
	</div>
</template>


<script>
export default {
	props: {
		user: {
			type: Object,
			default: null,
		},
	},
};
</script>

<style scoped>
.about {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
