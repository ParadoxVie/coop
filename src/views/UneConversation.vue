<template>

    <div>
        <h1 class="title is-1">{{this.uneConversation.label}}</h1>
        <h3 class="subtitle is-3">{{this.uneConversation.topic}}</h3>
        <hr>
        <div v-for="unMembre in this.$store.state.membres">

            <div class="test" v-for="message in messages">
                <div v-if="unMembre.id == message.member_id">
                    <b>{{unMembre.fullname}}</b>/{{message.message}}
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
export default {

    components: {
        ActionMsg,
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
        if(this.$route.params.id){

            api.get('channels/'+this.$route.params.id, {
                token : this.$store.state.token
            }).then(response => {
                
                this.uneConversation = response.data;

            }).catch(error => {
                alert(error.response.data.message)
            })
            
            this.chargerMsg();
            this.$bus.$on('charger-msg', this.chargerMsg);
        }
    },

    methods: {

        chargerMsg(){

            api.get('channels/'+this.$route.params.id +'/posts', {
                token : this.$store.state.token
            }).then(response => {
                this.messages = response.data;
            }).catch(error => {
                alert(error.response.data.message)
            })

        },

        sendMsg(){

            api.post('channels/'+this.$route.params.id +'/posts', {
                member_id: this.$store.state.membre.id,
                message: this.message,
                token : this.$store.state.token
            }).then(response => {
                this.chargerMsg();
            }).catch(error => {
                alert(error.response.data.message)
            })

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