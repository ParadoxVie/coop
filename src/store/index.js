import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {

    membre:false,
    token : false,
    membres:false,
    conversations:false

  },
  mutations: {

    setMembre(state, membre){
      state.membre = membre
    },

    setMembres(state, membres){
      state.membres = membres
    },

    setConversation(state, conversations){
      state.conversations = conversations
    },

    setToken(state, token){
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
