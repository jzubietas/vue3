/*!

=========================================================

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import store from './plugins/vuex'
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

import Gate from "./Gate";

Vue.prototype.$gate = new Gate();
// router setup
import router from './routes/router';

//axios
//require('./plugins/axios');
window.axios = require('axios');

window.axios.defaults.baseURL = 'http://localhost:8000/api/';

// console.log(store.state.user)

if(store.state.user){
  // console.log('pasa a la condicion')
  window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.user.token;
  window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
}
import VueDragResize from 'vue-drag-resize'

Vue.component('vue-drag-resize', VueDragResize)
// plugin setup
Vue.use(DashboardPlugin);

import moment from 'moment';


//filters
Vue.filter('acorcad', function(text){
  if(text.length > 15)
      return text.slice(0, 15)+"..."
  else return text
});

Vue.filter('status', function(text){
    return (text)?"Activo":"Inactivo"
  });

  Vue.filter('factmy', function(text){
    return (text)?"Si":"No"
  });

  Vue.filter('esvacio', function(text){
    return (text)?text:"----"
  });

  Vue.filter('statusUser', function(text){
    switch(text){
        case -1: return "Eliminado";
        case 0: return "Suspendido";
        case 1: return "Activo";
    }
  });

  Vue.filter('statusArqueo', function(text){
    switch(text){
        case 1: return "Por Depositar";
        case 2: return "Depositado";
    }
  });

  Vue.filter('statusTurno', function(text){
    switch(text){
        case 1: return "Abierto";
        case 2: return "Cerrado";
        case 3: return "Suspendido";
        case 4: return "En Revisión";
        case 5: return "Verificado";
    }
  });

  Vue.filter('statusFactura', function(text){
    switch(text){
        case 0: return "Creado";
        case 1: return "Impreso";
        case 2: return "Anulado";
        case 3: return "Devolucion Parcial";
        case 4: return "Devolucion Total";
    }
  });

  Vue.filter('tipoPago', function(text){
    if(text==0){
        return "Todos";
    }
    else{
        return (text==1)?"Tarjeta de Debito":"Tarjeta de Credito";
    }
  });

  Vue.filter('tipoUser', function(text){
    let tipo = "Sin Tipo";

    switch(text){
      case 0: tipo = "Administrador"; break;
      case 1: tipo = "Autorizado"; break;
      case 2: tipo = "Limitado"; break;
      case 3: tipo = "User"; break;
    }

    return tipo;
  });

  Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  Vue.filter('mayus', function(text){
    return text.toUpperCase();
  });

  Vue.filter('myTime',function(created){
    //return moment(created, 'YYYY-MM-DD').format(format);//moment(created).format('MMMM Do YYYY');
    if(created == null) return "*";
    return moment(created).format('hh:mm a');
  });

  Vue.filter('myDate',function(created){
    //return moment(created, 'YYYY-MM-DD').format(format);//moment(created).format('MMMM Do YYYY');
    return moment(created).format('DD/MM/YYYY');
  });

  Vue.filter('myDateTime',function(created){
    //moment(date, 'YYYY-MM-DD').format(format);//moment(created).format('MMMM Do YYYY');
    if(created)
      return moment(created).format('DD/MM/YYYY hh:mm a');
    else
      return "----";
  });

  Vue.filter('moneda', function(text){
    if(text!="----"){
    let val = (text/1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    return text
  });

  Vue.filter('ActInc', function(text){
    if(text){
      return "Activado"
    }
    return "Inactivo"
  });

  Vue.filter('tipoMoneda', function(text, formaPago){
    if(text!="----"){
      let val = (text/1).toFixed(2).replace('.', ',')
      let fp = (formaPago==2 || formaPago==6 )?"$":"Bs."
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+" "+fp
    }
    return text
  });

  Vue.filter('zfill', function(number, width=6){
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */
    var zero = "0"; /* String de cero */

    if (width <= length) {
        if (number < 0) {
            return ("-" + numberOutput.toString());
        } else {
            return numberOutput.toString();
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString());
        }
    }
  });

window.Fire =  new Vue();
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
