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
						<p> Lutece, Copyright 2018, Keshen, Zhuhe. All rights reserved. </p>
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
