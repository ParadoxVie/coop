<template>
    <div class="img">
        <router-link :to="{name: 'uneConversation', params:{id : uneConv.id}}"><img src="../assets/Icon/view.png" alt=""></router-link>
        <img class='edit' @click="showEditForm()" src="../assets/Icon/edit.png" alt="">
        <img class="trashConv" @click="supprimerConv()" src="../assets/Icon/trash.svg" alt="">

        <div class="ModalEditConvo">
            <div v-if="afficherEditForm" class="modal" id="modal1">
                <div id="modal_content">
                    <h3 class="title is-3">Modifier la conversation : {{uneConv.label}}</h3>            
                    
                    <div class="FormConv">
                        <form @submit.prevent="modifierConv">
                            <div class="Label">
                            <p class="subtitle is-5"> Saisir le label</p>
                            <input class="input is-primary is-rounded" v-model="label2" type="text" placeholder="Saisir le label" required>
                            <br><br>
                            </div>
                            <div class="Topic">
                            <p class="subtitle is-5"> Saisir le topic</p>
                            <input class="input is-primary is-rounded" v-model="topic2" type="text" placeholder="Saisir le topic" required>
                            <br><br>
                            </div>
                            <button class="button is-success">Modifier une conversation</button>
                        </form>
                    </div>

                    <button @click="closeEditForm()" id="modal_close">X</button>
                </div>
            </div>    
        </div>
        
    </div>
</template>

<script>
export default {
    props:['uneConv'],
    data() {
        return {
            afficherEditForm:false,
            label2:"",
            topic2:"",
        }
    },
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
        },
        
        showEditForm(){
            this.afficherEditForm = true    
            console.log(this.afficherEditForm);   
        },
        closeEditForm(){
            this.afficherEditForm = false       
        },
        modifierConv(){
            api.put('channels/'+this.uneConv.id, {
                label : this.label2,
                topic : this.topic2,
            }).then(response => {
                alert('La conversation a été modifiée !');
                this.$bus.$emit('charger-Conversation');
            }).catch(error => {
                alert(error.response.data.message)
            })
        }
    }
}

</script>

<style lang="scss">


.ModalEditConvo .modal {
    width:100%;
    height: 100%;
    position: absolute;
    top:0; left:0;
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
}

.ModalEditConvo .modal #modal_close {
    
    opacity: 1;
    color: rgb(255, 0, 0);
    border: none;
    position:absolute; top:0; right:0;
    padding : 0.5em;
    font-size: 1.5em;
    background-color: white;
    
}
.ModalEditConvo .modal #modal_close:hover {
    color: rgba(255, 46, 46, 0.5);
    
}

.ModalEditConvo .modal  #modal_content {
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