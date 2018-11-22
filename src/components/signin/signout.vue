<template>
	<div/>
</template>


<script>
import Store from '@/store/index';
import { goBack } from '@/router/utils';

export default {
	mounted() {
		Store.dispatch('user/logout').then(
			() => goBack(),
		);
	},
};
</script>
