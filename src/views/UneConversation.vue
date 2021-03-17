<template>

    <div>
        <h1 class="title is-1">{{this.uneConversation.label}}</h1>
        <h3 class="subtitle is-3">{{this.uneConversation.topic}}</h3>
        <hr>
        <div v-for="unMembre in this.$store.state.membres">

            <div class="test" v-for="message in messages">
                <div v-if="unMembre.id == message.member_id">
                    <AvatarMember :mailMembre="unMembre.email"/>
                    <router-link :to="{name: 'fiche-membre', params:{id : unMembre.id}}">
                        <b>{{unMembre.fullname}}</b>
                    </router-link>
                        / {{message.message}}
                    
                    <ActionMsg :unMembre="unMembre" :unMsg="message"/>
                    <hr>
                </div>
                
            </div>

        </div>

        <hr>
        <div class="FormMsg">
            <form @submit.prevent="sendMsg">
                <div class="Label">
                    <p class="subtitle is-5"> Saisir votre message</p>
                    <input class="input is-primary is-rounded" v-model="message" type="text" placeholder="Saisir le message" required>
                    <br><br>
                </div>
                <button class="button is-success">Envoyer Message</button>
            </form>
        </div>
        <hr>
    </div>

</template>

<script>
import ActionMsg from '@/components/ActionMsgConversation.vue';
import AvatarMember from '@/components/AvatarMember.vue';
export default {

    components: {
        ActionMsg,
        AvatarMember
    },
    data() {
        return {
            uneConversation : false,
            message: '',
            messages:[],
            memb:'',
        }
    },

    mounted() {
        //récupère au chargement de la page la conversation avec l'id passé en paramètre de l'url suite au click sur la précédente page
        if(this.$route.params.id){

            api.get('channels/'+this.$route.params.id, {
                token : this.$store.state.token
            }).then(response => {
                
                this.uneConversation = response.data;

            }).catch(error => {
                alert(error.response.data.message)
            })
            // Puis charge les messages de la conversation
            this.chargerMsg();
            this.$bus.$on('charger-msg', this.chargerMsg);
        }
    },

    methods: {
        //permet de charger les messages de la conversation
        chargerMsg(){

            api.get('channels/'+this.$route.params.id +'/posts', {
                token : this.$store.state.token
            }).then(response => {
                this.messages = response.data;
            }).catch(error => {
                alert(error.response.data.message)
            })

        },
        //Permet de poster un message
        sendMsg(){

            api.post('channels/'+this.$route.params.id +'/posts', {
                member_id: this.$store.state.membre.id,
                message: this.message,
                token : this.$store.state.token
            }).then(response => {
                this.chargerMsg();
                this.message = "";
            }).catch(error => {
                alert(error.response.data.message)
            })
            //quand le message est posté on recharge donc les messages pour le voir s'afficher directement 
            this.chargerMsg()
        },

    },
}
</script>

<style lang="scss">

.FormMsg{
    
    p{
        margin-right : 85%;
    }
    input{
        margin-right : 20%;
        width: 75%;
    }

    button{
        margin-right : 86%;
    }    
}

.test{
    margin-left: 50px;
    text-align: left;
}
    
</style>