<template>
    <div>
        <h1 class="title is-1">Fiche du membre :{{leMembre.fullname}}</h1>
        <div class="InformationMembre">
            <p class="subtitle is-5">Email : {{leMembre.email}}</p>
            <p class="subtitle is-5">Créer le : {{leMembre.depuis}}</p>
            <div v-for="message in messages">
                <MsgMembre :unMsg="message"/>
            </div>
        </div>


    </div>
</template>

<script>
import MsgMembre from '@/components/MsgMembre.vue';
export default {
    components: {
        MsgMembre,
    },
    data() {
        return {
            leMembre: [],
            messages: []
        }
    },

    mounted() {
        this.leMembre = this.$store.getters.getMembre(this.$route.params.id);
        let d = new Date(this.leMembre.created_at)
        let options = { weekday: 'long', year:'numeric', month:'long', day:'numeric'};
        this.leMembre.depuis = d.toLocaleDateString('fr-Fr', options)

        this.$store.state.conversations.forEach(conversation => {
            api.get('channels/'+conversation.id+'/posts').then(response => {
                response.data.forEach(message => {
                    if(message.member_id == this.$route.params.id){
                        this.messages.push(message);
                    }
                });
            })        
        });
    },
}
</script>