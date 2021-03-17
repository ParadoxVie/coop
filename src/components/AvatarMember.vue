<template>
    <div class="imgAvatar">
        <img class="gravatar" :src="'https://avatars.dicebear.com/v2/avataaars/'+mailHash+'.svg'" alt="Avatar" width="20px">
    </div>
</template>

<script>
export default {
    props:['mailMembre'], // récupère le mail du membre

    data() {
        return {
            mailHash: ""
        }
    },

    mounted() {
        let md5 = require('md5');//créer une variable md5 pour pouvoir utiliser le hash
        console.log(md5(this.mailMembre))
        this.mailHash = md5(this.mailMembre);//hash le mail pour pouvoir créer l'avatar
    },
}
</script>

<style lang="css">

.imgAvatar:first-child{
    float:left;
}

</style>