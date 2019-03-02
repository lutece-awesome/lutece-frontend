import {
	Vuetify, // required
	VSlider,
	VTimePicker,
	VDatePicker,
	VDialog,
	VCheckbox,
	VChip,
	VAlert,
	VImg,
	VProgressCircular,
	VHover,
	VTooltip,
	VApp, // required
	VTextarea,
	VSubheader,
	VSwitch,
	VNavigationDrawer,
	VGrid,
	VToolbar,
	VList,
	VBtn,
	VAvatar,
	VCard,
	VMenu,
	VIcon,
	VAutocomplete,
	VDataTable,
	VPagination,
	VTabs,
	VSelect,
	VTextField,
	VForm,
	VDivider,
	VProgressLinear,
	VSnackbar,
	VDataIterator,
	transitions,
} from 'vuetify';
import { Resize } from 'vuetify/es5/directives';
import colors from 'vuetify/es5/util/colors';
import DatetimePicker from 'vuetify-datetime-picker';
import Vue from './vue';
import '@/stylus/main.styl';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify-datetime-picker/src/stylus/main.styl';

Vue.use(DatetimePicker);

Vue.use(Vuetify, {
	components: {
		VSlider,
		VTimePicker,
		VDatePicker,
		VDialog,
		VCheckbox,
		VChip,
		VAlert,
		VImg,
		VProgressCircular,
		VHover,
		VTooltip,
		VTextarea,
		VSubheader,
		VSwitch,
		VApp,
		VNavigationDrawer,
		VGrid,
		VToolbar,
		VList,
		VBtn,
		VAvatar,
		VCard,
		VMenu,
		VIcon,
		VAutocomplete,
		VDataTable,
		VPagination,
		VTabs,
		VSelect,
		VTextField,
		VForm,
		VDivider,
		VProgressLinear,
		VSnackbar,
		VDataIterator,
		transitions,
	},
	directives: {
		Resize,
	},
	iconfont: 'mdi',
	theme: {
		primary: colors.blue.darken1,
		secondary: colors.blue.darken2,
		accent: colors.pink.base,
	},
});
