<template>
    <div class="Message">
        <div class="user">
            <h4>Message posté par {{leMembre.fullname}} le : {{unMsg.depuis}}</h4>
            <h4> posté dans la conversation : <router-link :to="{name: 'uneConversation', params:{id : channel.id}}">{{channel.label}}</router-link></h4>
        </div>

        <div class="leMsg">
            <p>{{unMsg.message}}</p>
        </div>
        
    </div>
</template>

<script>
export default {
    props:['unMsg'],

    data() {
        return {
            leMembre: [],
            channel:[]
        }
    },

    mounted() {
        this.leMembre = this.$store.getters.getMembre(this.$route.params.id);

        let d = new Date(this.unMsg.created_at);
        let options = { weekday: 'long', year:'numeric', month:'long', day:'numeric'};
        this.unMsg.depuis = d.toLocaleDateString('fr-Fr', options);
        api.get('channels/'+this.unMsg.channel_id).then(response => {
            this.channel = response.data;
        }).catch(error => {
          alert(error.response.data.message)
        })  
        
        
    },
}
</script>

<style lang="scss">

.user{
    border-bottom:solid 1px black;
    display:flex;
    background-color: rgb(243, 243, 243);
    h4:first-child{
        text-align:left;
        margin-left: 10px;
    }

    h4:last-child{
        margin-left: auto;
        margin-right: 10px;
    }
}

.leMsg{   
    p{
        text-align:left;
    }
}
    
</style>