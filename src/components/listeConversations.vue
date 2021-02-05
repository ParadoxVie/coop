<template>
    <div class="img">
        <router-link :to="{name: 'uneConversation', params:{id : uneConv.id}}"><img src="../assets/Icon/view.png" alt=""></router-link>
        <img class='edit' @click="supprimerConv()" src="../assets/Icon/edit.png" alt="">
        <img @click="supprimerConv()" src="../assets/Icon/trash.svg" alt="">
        
    </div>
</template>

<script>
export default {
    props:['uneConv'],
    methods: {
        supprimerConv(){
            if(confirm('Voulez vous supprimer la conversation '+this.uneConv.label+' ?')){
                api.delete('channels/'+this.uneConv.id, {
                }).then(response => {
                    this.$bus.$emit('charger-Conversation');
                }).catch(error => {
                    alert(error.response.data.message)
                })
            }
        } 
    }
}

</script>

<style lang="scss">

div.img img:first-child{
    width: 25px;
    margin-top : 3px;
    margin-right : 10px;
}

div.img img:nth-child(2).edit{
    width: 22px;
    margin-left : 0px;
    margin-right: 5px;
}

    
</style>