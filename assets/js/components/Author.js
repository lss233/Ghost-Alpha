import PostCard from './PostCard.js'
export default {
	template: `
		<div>
			<div id="main" class="box" style="margin-top: 0em;">
				<header>
					<span class="image avatar"><img :src="author.profile_image" v-if="author.profile_image"></span>
					<h2>{{ author.name }}</h2>
					<p>{{ author.bio }}</p>
					<div class="author-meta">
						<span v-if="author.location">
							<i class="fa fa-map-marker" aria-hidden="true"></i>
							{{ author.location }}
						</span>
						<span v-if="author.website">
							<i class="fa fa-link" aria-hidden="true"></i>
							<a :href="author.website" target="_blank">{{ author.website }}</a>
						</span>
						<span>
							<i class="fa fa-pencil" aria-hidden="true"></i>
							{{posts.length}}
							{{t('posts')}}
						</span>
					</div>
				</header>
			</div>
				<div class="row">
					<div class="col-12">
						<post-card :post="post" :author="author" v-for="post in posts" :key="post.id"></post-card>
					</div>
				</div>
		</div>
	`,
	name: 'Author',
	data () {
		return {
			author: {},
			meta: {},
			posts: [],
		}
	},
	components: {
	'post-card': PostCard
	},
	methods: {
		scroll (vue, posts) {
	 		window.onscroll = () => {
	 			var bottomOfWindow = $(window).scrollTop()>=$('#main').height();
		      if (bottomOfWindow && vue.meta.pagination.next && !window.isLoading) {
		      	window.isLoading = true
		        axios.get(ghost.url.api('posts', {limit: 2, page: vue.meta.pagination.next}))
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
		axios.get(ghost.url.api('users/slug/' + this.$route.params.slug ))
					.then(res => {
						this.author = res.data.users[0]
						if(this.author.cover_image){
							$('#banner').css('background-image',"url('/assets/images/overlay.png'), url('" + this.author.cover_image + "')")
						}
						return axios.get(ghost.url.api('posts/', { filter: 'author:' + this.author.slug}))
					})
					.then(res => {
						this.posts = res.data.posts
						this.meta = res.data.meta
						this.scroll(this, this.posts)
					})

	}
}