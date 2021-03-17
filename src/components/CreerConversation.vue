<template>
    <div>

        <div class="FormConv">
            <form @submit.prevent="creerConversation">
                <div class="Label">
                <p class="subtitle is-5"> Saisir le label</p>
                <input class="input is-primary is-rounded" v-model="label" type="text" placeholder="Saisir le label" required>
                <br><br>
                </div>
                <div class="Topic">
                <p class="subtitle is-5"> Saisir le topic</p>
                <input class="input is-primary is-rounded" v-model="topic" type="text" placeholder="Saisir le topic" required>
                <br><br>
                </div>
                <button class="button is-success">Créer une conversation</button>
            </form>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            topic:'',
            label:''
        }
    },

    methods: {
        //Permet de créer une conversation et de la save dans l'api
        creerConversation(){
            api.post('channels', {
                label : this.label,
                topic : this.topic,
            }).then(response => {
                alert('La conversation a été créer !');  
            }).catch(error => {
                alert(error.response.data.message)
            })
        },

    },
}
</script>

<style lang="scss">

.FormConv{
    input{
        width: 80%;
    } 
}

</style>