export default {
  template: `
  <section class="box special">
    <span class="image featured"><img :src="post.feature_image" alt="" /></span>
    <router-link tag="h3" :to="{name: 'Post', params: { slug: post.slug }}">
      <a>
        {{post.title}}
      </a>
    </router-link>
    <div class="preview" v-html="post.html"></div>
    <div class="divider"></div>
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
	{{ publishedDate }}
              </time>
          </div>
        </div>
    <ul class="actions special">
      <router-link tag="li" :to="{name: 'Post', params: { slug: post.slug }}">
        <a class="button alt">Learn More</a>
      </router-link>
    </ul>
  </section>
  `,
  name: 'PostCard',
  props: {
    post: Object,
    author: Object,
  },
  data() {
    return {
    }
  },
  computed: {
    publishedDate() {
       return new Intl.DateTimeFormat().format(new Date(this.post.published_at))
    }
  }
}
