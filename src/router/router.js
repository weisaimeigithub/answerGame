import App from '../App'



// export default new Router({
//   routes: [
//     {
//       path: '/',
//       component: App,
//       children:[
//         {//二级路由
//             path:'index',
//             component:resolve => require(['@/page/home/index.vue'],resolve)
//         },
//         {
//           path:'index',
//           component:resolve => require(['@/page/item/index.vue'],resolve)
//         },
//         {
//           path:'index',
//           component:resolve => require(['@/page/score/index.vue'],resolve)
//         }
//       ]
//     }
//   ]
// })
export default [{
  path: '/',
  component: App,
  children: [{
      path: '',
   
      component: r => require.ensure([], () => r(require('../page/home')), 'home')
  }, {
      path: '/item',
   
      component: r => require.ensure([], () => r(require('../page/item')), 'item')
  }, {
      path: '/score',
   
      component: r => require.ensure([], () => r(require('../page/score')), 'score')
  }]
}]