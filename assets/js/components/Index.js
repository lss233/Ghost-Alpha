import PostCard from './PostCard.js'
export default {
	template: `
			<div class="row">
				<div class="col-12">
					<post-card :post="post" :author="authors[post.author]" v-for="post in posts" :key="post.id"></post-card>
				</div>
			</div>
	`,
	name: 'Index',
	components: {
		'post-card': PostCard
	},
	data () {
		return {
			posts: [],
			authors: {},
			meta: {},
		}
	},
	methods: {
		scroll (vue, posts) {
	 		window.onscroll = () => {
	 			var bottomOfWindow = $(window).scrollTop()>=$('#main').height();
		      if (bottomOfWindow && vue.meta.pagination.next && !window.isLoading) {
		      	window.isLoading = true
		        axios.get(ghost.url.api('posts', {limit: 6, page: vue.meta.pagination.next}))
		          .then(response => {
		          	for(var i = 0; i <= response.data.posts.length; i++)
		          		if(response.data.posts[i])
		            		posts.push(response.data.posts[i])
		            vue.meta = response.data.meta
		            window.isLoading = false
		          });
		      }
		    }
		}
	},
	created () {
		axios.get(ghost.url.api('users'))
				 .then(res => {
				 	for(var i of res.data.users)
				 			this.authors[i['id']] = i
				 	return axios.get(ghost.url.api('posts', {limit: 6}))
				 })
				 .then(res => {				 		
				 		this.posts = res.data.posts
				 		this.meta = res.data.meta
				 		this.scroll(this, this.posts)
				 })
	}
}