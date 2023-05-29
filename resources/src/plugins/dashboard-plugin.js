// Polyfills for js features used in the Dashboard but not supported in some browsers (mainly IE)
import '@/polyfills';
// Notifications plugin. Used on Notifications page
import Notifications from '@/components/NotificationPlugin';
// Validation plugin used to validate forms
import { configure } from 'vee-validate';
// A plugin file where you could register global components used across the app
import GlobalComponents from './globalComponents';
// A plugin file where you could register global directives
import GlobalDirectives from './globalDirectives';
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from '@/components/SidebarPlugin';

// element ui language configuration
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

// vue-bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// asset imports
import '@/assets/scss/argon.scss';
import '@/assets/vendor/nucleo/css/nucleo.css';
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';

//pluggins mios
import VueProgressBar from 'vue-progressbar'

//import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
//import 'sweetalert2/dist/sweetalert2.min.css';
/*import swal from 'sweetalert2'

window.swal = swal;

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.toast = toast;*/
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

import Loading from 'vue-loading-overlay';
//Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import axios from 'axios'
import VueAxios from 'vue-axios'

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});
export default {
  install(Vue) {
    Vue.use(GlobalComponents);
    Vue.use(GlobalDirectives);
    Vue.use(SideBar);
    Vue.use(Notifications);
    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);
    Vue.use(VueSweetalert2);
    Vue.use(Loading);
    Vue.use(VueAxios, axios);
    Vue.use(VueProgressBar, {
      color: 'rgb(143, 255, 199)',
      failedColor: 'red',
      height: '3px'
    })        
    configure({
      classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
        dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
      }
    })
  }
};
