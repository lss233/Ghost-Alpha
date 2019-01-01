export default {
	template: `
		<div id="main" class="box" style="margin-top: 0em;">
			<header>
				<h2>{{ post.title }}</h2>
				<div class="post-meta">
					<div class="author-meta">

						<router-link :to="{name: 'Author', params: { slug: author.slug }}">
							<img class="author-thumb" :src="author.profile_image" :alt="author.name" nopin="nopin" v-if="author.profile_image">
							{{author.name}}
							<template v-if="post.primary_tag">
								{{t("at")}}
								<i class="fa fa-tags" aria-hidden="true"></i>
								{{post.primary_tag}}
							</template>
						</router-link>
					</div>
					<div class="meta-element">
		          <time class="post-date" :datetime="post.created_at">
		              <i class="fa fa-calendar" aria-hidden="true"></i>
		              12 February 2018
		          </time>
		      </div>
		    </div>
			</header>
			<div class="box content">
				<span class="image featured"><img :src="post.feature_image" alt="post.title" v-if="post.feature_image"/></span>
				<div v-html="post.html"></div>
			</div>
			<div class="comment" v-if="!post.page">
				<vue-disqus shortname="$config['disqus-shortname']" :identifier="post.comment_id" url="post.url"></vue-disqus>
			</div>
		</div>
	`,
	name: 'Post',
	data () {
		return {
			post: {},
			author: {}
		}
	},
	created () {
		axios.get(ghost.url.api('posts/slug/' + this.$route.params.slug))
			.then(res => {
				this.post = res.data.posts[0]
				return axios.get(ghost.url.api('users/' + this.post.author))
			})
			.then(res => this.author = res.data.users[0])
	}
}