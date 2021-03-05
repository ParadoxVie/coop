<template>
    <div class="imgAvatar">
        <img class="gravatar" :src="'https://avatars.dicebear.com/v2/avataaars/'+mailHash+'.svg'" alt="Avatar" width="20px">
    </div>
</template>

<script>
export default {
    props:['mailMembre'],

    data() {
        return {
            mailHash: ""
        }
    },

    mounted() {
        var md5 = require('md5');
        console.log(md5(this.mailMembre))
        this.mailHash = md5(this.mailMembre);
    },
}
</script>

<style lang="css">
.imgAvatar:first-child{
    float:left;
}
</style>