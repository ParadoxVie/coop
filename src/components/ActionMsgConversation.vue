<template>
    <div>

        <img class="ActionMsg" @click="supprimerMsg" src="../assets/Icon/trash.svg" alt="">
        <img class="ActionMsg" @click="ouvrirForm" src="../assets/Icon/edit.png" alt="">

        <div v-if="afficherForm" class="modalModifMess" id="modal1">
            <div id="modal_content">
                <h3 class="title is-4">Modifier le message '{{unMsg.message}}' de {{unMembre.fullname}}</h3>            
                    <div class="ModifMsg">
                        <p class="subtitle is-5"> Saisir votre message</p>
                        <input class="input is-primary is-rounded" v-model="message" type="text" placeholder="Saisir le message" required>
                        <br><br>
                        <button @click="editMsg" class="button is-success">Modifier le message</button>
                    </div>
                <button @click="fermerForm" id="modal_close">X</button>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props:['unMembre', 'unMsg'],
    data() {
        return {
            afficherForm:false,
            message:''
        }
    },
    methods: {

        //permet de supprimer un message au click de l'icon seulement si c'est la personne co qui a posté le message
        supprimerMsg(){
            if(this.unMsg.member_id == this.$store.state.membre.id){
                if(confirm('Voulez vous supprimer ce message '+this.unMsg.message+' ?')){
                    api.delete('channels/'+this.unMsg.channel_id+'/posts/'+this.unMsg.id, {
                    }).then(response => {
                        this.$bus.$emit('charger-msg');
                    }).catch(error => {
                        alert(error.response.data.message)
                    })
                }
            }else{
                alert('Vous ne pouvez pas supprimer un message qui n\'est pas le votre');
            }


        },
        //permet de modifier un message au click de l'icon seulement si c'est la personne co qui a posté le message
        editMsg(){
            if(this.unMsg.member_id == this.$store.state.membre.id){

                api.put('channels/'+this.unMsg.channel_id+'/posts/'+this.unMsg.id, {
                    message: this.message
                }).then(response => {
                    this.$bus.$emit('charger-msg');
                    this.fermerForm();
                }).catch(error => {
                    alert(error.response.data.message)
                })

            }else{
                alert('Vous ne pouvez pas modifier un message qui n\'est pas le votre');
            }
        },
        //permet de fermer la fenetre modal
        fermerForm(){
            this.afficherForm = false
            this.$bus.$emit('charger-Conversation');
        },
        //permet d'ouvir la fenetre modal
        ouvrirForm(){
            this.afficherForm = true
        }
    },
}
</script>

<style lang="scss">

img.ActionMsg{
    margin-right: 10px;
    width:20px;
    float: right;
}

.modalModifMess {
    width:100%;
    height: 2300px;
    position: absolute;
    top:0; left:0;
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
}

.modalModifMess #modal_close {
    
    opacity: 1;
    color: rgb(255, 0, 0);
    border: none;
    position:absolute; top:0; right:0;
    padding : 0.5em;
    font-size: 1.5em;
    background-color: white;
    
}
.modalModifMess #modal_close:hover {
    color: rgba(255, 46, 46, 0.5);
    
}

.modalModifMess  #modal_content {
    box-sizing: border-box;
    
    color : white(255, 0, 0);
    width: 50%;
    height: 250px;
    margin: 0 auto;
    margin-top : 8%;
    position: relative;
    background-color:white;
    border-radius:1%;

}

.modalModifMess .ModifMsg button{
    margin-left: 38%;
}

.modalModifMess .modifMsg input{
    width: 60%;
}
    
</style>

