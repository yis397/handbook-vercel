
import {createRouter,createWebHashHistory} from 'vue-router'
import home from '../modules/home/routes/route'
import Login from '../modules/auth/router/route'
import isUserRouter from '../router/auth-guard'

const routes = [
    { path: '/', ...home},
    { path: '/about',  ...Login,name:'about'},
    
  ]
  
  const router = createRouter({

    history: createWebHashHistory(),
    routes, 
  })
  router.beforeEach((to,from,next)=>isUserRouter(to,from,next))
  export default router