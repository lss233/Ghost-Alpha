import Index from './Index.js'
export default {
	template: 
	`
		<div>
			<template v-if="$route.name === 'Index'">
				<Index></Index>
			</template>
			<router-view v-else/>
		</div>
	`,
	name: 'App',
	components: {
		Index
	},
	data () {
		return {
		}
	},
	created () {
		$('#social-instagram').attr('href', this.$config['instagram-url'])
		$('#social-github').attr('href', this.$config['github-url'])
	}
}