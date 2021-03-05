import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: { //déclare les variables du store

    membre:false,
    token : false,
    membres:false,
    conversations:false

  },
  mutations: {

    setMembre(state, membre){ // stock la personne co
      state.membre = membre
    },

    setMembres(state, membres){// stock tous les membres de l'api
      state.membres = membres
    },

    setConversation(state, conversations){// stock toutes les convo de l'api
      state.conversations = conversations
    },

    setToken(state, token){//stock le token de l'api
      state.token = token
    },

    seDeconnecter(state){
      state.membre = false;
      state.token = false;
    },

  },
  getters: {

    getMembre(state)
    {
      let fonction = (membre_id)=>{
        return state.membres.find((membre) =>{
          return membre.id == membre_id;
        })
      }
      return fonction;
    }

  },
  actions: {
  },
  modules: {
  },

  plugins: [vuexLocal.plugin]
})
