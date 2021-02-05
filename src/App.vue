<template>
  <div id="app" v-if="apiOk">
    <Header/>

    <router-view/>
  </div>
  <div v-else>
    l'api ne marche pas
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  
  components: {
    Header
  },

  data() {
    return {
      apiOk:false
    }
  },
  mounted() {
    console.log("lapp est démarée")

    api.get('ping').then(reponse =>{
      console.log('lapi est fonctionelle');

      if(!this.$store.state.membre){

        if(this.$route.path != '/se-connecter' && this.$route.path != '/creer-Compte'){
            this.$router.push('/se-connecter');
        }
        
      } else {

        this.chargerMembres();
        this.$bus.$on('charger-membres', this.chargerMembres);

        this.chargerConversation();
        this.$bus.$on('charger-Conversation', this.chargerConversation);
      }
     
      this.apiOk=true;
    }).catch(error =>{
      console.log("l'api ne marche pas");
    })

  },
  methods: {
    chargerMembres(){
      api.get('members', {
          token : this.$store.state.token
      }).then(response => {
          this.$store.commit('setMembres', response.data);

      }).catch(error => {
          console.log('members',error.response.data.message)
      })
    },

    chargerConversation(){

      api.get('channels', {
          token : this.$store.state.token
      }).then(response => {
          this.$store.commit('setConversation', response.data);

      }).catch(error => {
          console.log('channels',error.response.data.message)
      })

    },

  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
