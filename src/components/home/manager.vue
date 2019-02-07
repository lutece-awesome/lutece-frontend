<template>
	<v-container>
		<v-layout
			row
			fill-height
			align-center
			justify-center
			wrap
		>
			<v-flex
				xs12
				md10
				lg8
				class = "text-xs-center"
			>
				<div class = "font-weight-bold display-1">
					Home Manager
				</div>
				<div class = "mt-4">
					<v-btn
						v-for = "( each , index ) in item"
						:key = "index"
						:color = "each.color"
						:to = "each.to"
					>
						<a
							v-if = "each.url"
							:href = "each.url"
							class = "white--text"
						>
							{{ each.info }}
						</a>
						<span v-else>
							{{ each.info }}
						</span>
					</v-btn>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
export default {
	data: () => ({
		item: [
			{
				info: 'Create - Home - Article',
				color: 'success',
			},
			{
				info: 'Edit - Home - Article',
				color: 'info',
				to: {
					name: 'Blog',
				},
			},
		],
	}),
};
</script>
