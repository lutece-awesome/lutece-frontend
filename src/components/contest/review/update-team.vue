<template>
	<v-dialog
		:value = "value"
		width = "800"
		persistent
		@input = "$emit( 'input' , $event )"
	>
		<preview
			:name = "name"
			:submit = "submit"
			:member-list = "memberList"
			:form-title = "formTitle"
			:extra = "extra"
			:info = "info"
			@input-name = "name = $event"
			@input-cancel = "$emit( 'input' , false )"
			@input-appendUser = "appendUser"
			@input-removeUser = "removeUser"
			@input-info = "info = $event"
		/>
	</v-dialog>
</template>

<script>

import { mapGetters } from 'vuex';
import preview from './team-preview';

export default {

	components: {
		preview,
	},

	props: {
		value: {
			type: Boolean,
			default: false,
		},
		formTitle: {
			type: String,
			default: '',
		},
		submit: {
			type: Function,
			default: () => Promise.resolve(),
		},
		owner: {
			type: Object,
			default: null,
		},
		baseName: {
			type: String,
			default: '',
		},
		members: {
			type: Array,
			default: () => ([]),
		},
		extra: {
			type: String,
			default: '',
		},
		baseInfo: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			name: '',
			memberList: [],
			info: '',
		};
	},

	computed: {
		...mapGetters({
			profile: 'user/profile',
		}),
	},

	mounted() {
		this.name = this.baseName;
		this.info = this.baseInfo;
		if (this.members.length > 0) {
			this.memberList = JSON.parse(JSON.stringify(this.members));
		} else {
			this.memberList.push(this.profile.username);
		}
	},

	methods: {
		appendUser(user) {
			if (user && !this.memberList.find(each => each === user)) {
				this.memberList.push(user);
			}
		},
		removeUser(index) {
			this.memberList.splice(index, 1);
		},
	},
};
</script>
