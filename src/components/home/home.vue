<template>
	<div/>
</template>

<script>
export default {
	metaInfo() { return { title: 'Home' }; },
	data: () => ({
		cards: [
			{
				icon: 'mdi-material-design',
				title: 'Material Design',
				text: 'Design based on Google Material, easily to touch beautify',
			},
			{
				icon: 'mdi-flash',
				title: 'Fast and flexible',
				text: 'Core drived by distributed judge Osiris, so powerful and amazing',
			},
			{
				icon: 'mdi-wrench',
				title: 'Easily expandable',
				text: 'Developed by Python and Vue, stand on the shoulders of giants, to build your own Lutece',
			},
		],
	}),
};
</script>
