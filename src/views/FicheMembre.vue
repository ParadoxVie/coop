<template>
    <div>
        <h1 class="title is-1">Fiche du membre :{{leMembre.fullname}}</h1>
        <div class="InformationMembre">
            <a class="subtitle is-5" :href="'mailto:'+leMembre.email">Email : {{leMembre.email}}</a>
            <p class="subtitle is-5">Créer le : {{leMembre.depuis}}</p>
            <img :src="'https://avatars.dicebear.com/v2/avataaars/'+mailHash+'.svg'" alt="fail" width="150px">
            <div v-for="message in messagesTries">
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
            messages: [],
            mailHash: ''
        }
    },

    computed:{
        messagesTries(){
            function compare(a, b){
                if(a.created_at > b.created_at){
                    return -1;
                }
                if(a.created_at < b.created_at){
                    return 1;
                }
                return 0;
            }
            return this.messages.sort(compare).slice(0,10);
        }
    },

    mounted() {
        var md5 = require('md5');
        
        this.leMembre = this.$store.getters.getMembre(this.$route.params.id);
        let d = new Date(this.leMembre.created_at)
        let options = { weekday: 'long', year:'numeric', month:'long', day:'numeric'};
        this.leMembre.depuis = d.toLocaleDateString('fr-Fr', options)
        console.log(md5(this.leMembre.email))
        this.mailHash = md5(this.leMembre.email);

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