<template>
    <div>
        <h1 class="title is-1">Liste des Conversations</h1>
        <button @click="ouvrirForm()" class="button is-link is-outlined">Créer une conversation</button>

        <div class="ModalCreateConvo">
            <div v-if="afficherForm" class="modal" id="modal1">
                <div id="modal_content">
                    <h3 class="title is-3">Créer une conversation</h3>            
                    <CreerConversation/>
                    <button @click="fermerForm()" id="modal_close">X</button>
                </div>
            </div>    
        </div>
        <div class="liste-conversation">
            <table>
                <tr>
                    Liste des conversations (Nb membres)
                </tr>
                <tr v-for="uneConv in $store.state.conversations">
                    <img src="../assets/Icon/conversation.png" alt="">
                    <b>{{uneConv.label}}</b> /
                    {{uneConv.topic}}
                    <listeConversations :uneConv="uneConv"/>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import CreerConversation from '@/components/CreerConversation.vue';
import listeConversations from '@/components/listeConversations.vue';


export default {
    components: {
        CreerConversation,
        listeConversations
    },

    data() {
        return {
            afficherForm:false,
        }
    },

    methods: {
        fermerForm(){
            this.afficherForm = false
            this.$bus.$emit('charger-Conversation');
        },

        ouvrirForm(){
            this.afficherForm = true
        }
    },
    
}
</script>

<style lang="scss">

.ModalCreateConvo .modal {
    width:100%;
    height: 100%;
    position: absolute;
    top:0; left:0;
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
}

.ModalCreateConvo .modal #modal_close {
    
    opacity: 1;
    color: rgb(255, 0, 0);
    border: none;
    position:absolute; top:0; right:0;
    padding : 0.5em;
    font-size: 1.5em;
    background-color: white;
    
}
.ModalCreateConvo .modal #modal_close:hover {
    color: rgba(255, 46, 46, 0.5);
    
}

.ModalCreateConvo .modal  #modal_content {
    box-sizing: border-box;
    
    color : white(255, 0, 0);
    width: 50%;
    height: 400px;
    margin: 0 auto;
    margin-top : 8%;
    position: relative;
    background-color:white;
    border-radius:1%;

}


img:first-child{
    float:left;
    width:25px;
}
div.img{
    float:right;
}
div.img img{
    width:20px;
    margin-left: 0%;;
}

table{
    border:solid 1px;
    width:80%;
    margin: 0 auto;
    margin-top: 50px;
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
}

tr{
    border:solid 1px black;
}

tr:first-child{
  text-align: left;
  background-color: #4c7faf;
  color: white;
  font-size:150%;
}

tr:nth-child(even){
    background-color: #f3f3f3;
}

</style>

