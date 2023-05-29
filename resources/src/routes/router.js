import Vue from 'vue';
import store from '../plugins/vuex'
import VueRouter from 'vue-router';
import routes from './routes';


Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  //mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

//const gate = new Gate();
router.beforeEach( ( to, from, next ) => { 
  if(to.path === '/login'){
    next();
  }else{
    if(store.state.user){
      next();
    }else{
      next('/login');
    }
  }
} );

export default router;
