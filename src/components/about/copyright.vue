<template>
	<v-hover>
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover ? 4 : 1}`"
		>
			<v-container>
				<v-layout
					row
					wrap>
					<v-flex xs12>
						<h1 class="headline mb-3 primary--text">Copyright</h1>
						<v-divider class = "mb-3" />
						<div>
							Lutece Copyright<i class = "copyright icon"/> 2018, Ke Shen(
							<a href = "Mailto:xipersup@gmail.com">xipersup@gmail.com</a> ). All rights reserved.
						</div>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-hover>
</template>


<script>
export default {

};
</script>
