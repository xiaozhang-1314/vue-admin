import Vuex from 'vuex';
import userlist from "./modules/userlist";
import userseve from './modules/userseve';
export default new Vuex.Store({
    namespaced: true,
    modules:{
       user_list:userlist,
       user_seve:userseve
    }
})
