<template>
    <div class="imgDelMember">
        <img @click="supprimerMembre" src="../assets/Icon/trash.svg" alt="">
    </div>
</template>

<script>
export default {
    props:['unMembre'],// récupère le membre actuel

    methods: {
        // supprime le membre lors du click sur l'icone "trash" empèche le membre de ce supprimer lui même.
        supprimerMembre(){
            console.log(this.unMembre.id);
            if(confirm('Voulez vous supprimer le membre '+this.unMembre.fullname+' ?')){
                if(this.unMembre.id != this.$store.state.membre.id){
                let id_mb = this.unMembre.id;
                api.delete('members/'+id_mb, {
                }).then(response => {
                    this.$bus.$emit('charger-membres');
                }).catch(error => {
                    alert(error.response.data.message)
                })
                }else{
                    alert('Vous ne pouvez pas vous supprimer !');
                }
            }
        }
        
    },
}
</script>