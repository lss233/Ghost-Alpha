"use strict";
import App from './components/App.js'
import Author from './components/Author.js'
import Index from './components/Index.js'
import Post from './components/Post.js'

Vue.config.productionTip = false
const routes = [
  { name: 'Index', path: '/', compoent: Index },
  { name: 'Author', path: '/author/:slug', component: Author },
  { name: 'Post', path: '/:slug', component: Post },
]
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
})
axios.get('/assets/js/config.js')
  .then(res => {
    Vue.prototype.$config = eval(res.data)
    return axios.get('/assets/locales/' + document.documentElement.lang + '.js')
  })
  .then(res => {
    Vue.prototype.t = (key) => {
      return eval(res.data)[key]
    }
    return Promise.resolve({})
  })
  .catch(err => {
    Vue.prototype.t = (key) => {
      return key
    }
    return Promise.resolve({})
  })
  .then(() => {
    var app = new Vue({
      el: '#app', 
      router,
      render: h => h(App)
    })
  })
