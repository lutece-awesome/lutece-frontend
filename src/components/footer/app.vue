<template>
	<div
		v-if = "visible"
		height = "auto"
		color = "primary lighten-1"
	>
		<v-container>
			<v-layout
				justify-center
				row
				wrap
			>
				<v-flex
					lighten-2
					py-3
					text-xs-center
				>
					<div>
						<a href = "https://github.com/lutece-awesome">
							<strong>
								<span class = "lutece"> Lutece </span>
								<sup> + {{ version }} </sup>
							</strong>
						</a>
						<span> Copyright (C) </span>
						<span> 2018-2019 </span>
					</div>
					<div class = "mt-1" >
						Judgecore Powered by
						<strong>
							<a href = "https://github.com/lutece-awesome/osiris">
								Osiris
							</a>
						</strong>
					</div>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

const { version } = require('@/utils');

export default {
	data() {
		return {
			version,
		};
	},
	computed: {
		...mapGetters({
			visible: 'footer/visible',
		}),
	},
};
</script>
