import store from './plugins/vuex';
export default class Gate{

    constructor( ){
        var myuser = store.state.user;
        if(myuser)
            this.usuario = myuser.lxvl;

        this.urlApi = '';
    }

    getApiUrl(local=0){
        let url = 'https://api.layer.huully.net.pe/api/';
        return url;
    }

    setTypeUser(type){
        switch(type){
           case 0: return 'admin'; break;
           case 1: return 'Administración'; break;
           //case 3: return ''; break;
        }

    }

    getTiendaId(){
        return  store.state.user.sucursal;
    }

	/**
	 * Removes JWT token from session and local storage
	 */
	removeLogin() {

        store.dispatch('user', null);
        localStorage.clear();
    }

    esLogeado(){
        if( store.state.user/*localStorage.getItem('token')*/) {
            return true;
        }else{
            return false;
        }
    }

    getTipoUsuario(){
        return  store.state.user.lxvl;
    }

    idUser(userlog){
        return userlog.id;
    }

    isAdmin(){
        return this.usuario  === 0;
    }

    isUserAdm(){
        return this.usuario  === 2;
    }



    isAuthor(){
        return this.usuario  === 1;
    }

    isUserAdminOrUser(){
        return(this.usuario  === 2 || this.usuario  === 21);
    }

    isUserAdminOrMer(){
      return(this.usuario  === 0 || this.usuario  === 4);
    }

    isAllAdminOrUsers(){
        return (this.usuario  === 2 || this.usuario  === 0 || this.usuario  === 1);
    }

    isAdminOrAuthor(){
        return(this.usuario  === 0 || this.usuario  === 1);
    }
    isAuthorOrUser(){
        return(this.usuario  === 2 || this.usuario  === 1);
    }
}
