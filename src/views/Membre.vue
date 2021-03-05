<template>
    <section>
        <div>
            <table>
                <tr>
                    Liste des membres
                </tr>
                <tr v-for="unMembre in $store.state.membres">
                    <AvatarMember :mailMembre="unMembre.email"/>
                    <router-link :to="{name: 'fiche-membre', params:{id : unMembre.id}}">
                    <b>{{unMembre.fullname}}</b> /
                    {{unMembre.email}}
                    </router-link>
                    <listeMembres :unMembre="unMembre"/>
                    
                </tr>
            </table>
        </div>
    </section>
</template>

<script>
import listeMembres from '@/components/listeMembres.vue';
import AvatarMember from '@/components/AvatarMember.vue';

export default {
    
    components: {
        listeMembres,
        AvatarMember
    },

    data() {
        return {

            membres : '',
            
        }
    },

    mounted() {

    },

}
</script>

<style>

div.imgDelMember{
    float:right;
}
div.imgDelMember img{
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