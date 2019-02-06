/* eslint-disable import/prefer-default-export */

import LoadingSpinner from '@/components/utils/loading-spinner';

const AsyncMixrendComponent = () => ({
	component: import('./mixrend/app'),
	loading: null,
	error: null,
});

const AsyncMixrendComponentWithLoadingSpinner = () => ({
	component: import('./mixrend/app'),
	loading: LoadingSpinner,
	error: null,
	delay: 0,
});

export { AsyncMixrendComponent, AsyncMixrendComponentWithLoadingSpinner };
