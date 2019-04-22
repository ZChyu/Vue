import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

  const routes = [
    {
      path:'/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve),
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children:[
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '首页' },
        },
        {
          path: '/table',
          component: resolve => require(['../components/page/BaseTable.vue'], resolve),
          meta: { title: '基础表格' },
        },
        {
          path: '/tabs',
          component: resolve => require(['../components/page/Tabs.vue'], resolve),
          meta: { title: 'tab选项卡' },
        },
        {
          path: '/form',
          component: resolve => require(['../components/page/formcorrelation/BaseForm.vue'], resolve),
          meta: { title: '基本表单' },
        },
        {
          path: '/editor',
          component: resolve => require(['../components/page/formcorrelation/VueEditor.vue'], resolve),
          meta: { title: '富文本编辑器' },
        },
        {
          path: '/markdown',
          component: resolve => require(['../components/page/formcorrelation/Markdown.vue'], resolve),
          meta: { title: 'Markdown编辑器' },
        },
        {
          path: '/upload',
          component: resolve => require(['../components/page/formcorrelation/Upload.vue'], resolve),
          meta: { title: '文件上传' },
        },
				{
					path: '/userlist',
					component: resolve => require(['../components/page/datalist/UserList.vue'], resolve),
					meta: { title: '用户列表' },
				},
				{
					path: '/shoplist',
					component: resolve => require(['../components/page/datalist/ShopList.vue'], resolve),
					meta: { title: '商家列表' },
				},
				{
					path: '/foodlist',
					component: resolve => require(['../components/page/datalist/FoodList.vue'], resolve),
					meta: { title: '食品列表' },
				},
				{
					path: '/orderlist',
					component: resolve => require(['../components/page/datalist/OrderList.vue'], resolve),
					meta: { title: '订单列表' },
				},
        {
          path: '/charts',
          component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
          meta: { title: 'chasts图表' },
        }
      ]
    },
    {
      path: '/404',
      component: resolve => require(['../components/page/404.vue'], resolve)
    }
  ]


const router = new Router({
    routes: routes // 简写：routes
});

router.beforeEach((to, from, next) => {
  // 获取 JWT Token
  if (localStorage.getItem('token')){
    // 如果用户在login页面
    if (to.path === '/login') {
      next({ path: '/dashboard' });
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login' });
    }
  }
});


/*router.beforeEach((to, from, next) => {

  if (to.matched.some(r => r.meta.requireAuth)) {
  if (to.path === '/login') {
    console.log("+++++")
    console.log(this.$store.state.token)
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(this.$store.state.token) {
      next({ path: '/dashboard' })
    } else {
      next()
    }
  } else {
    if (!this.$store.state.token) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      next()
    }
  }
}else{
 next()
}

})*/

export default router