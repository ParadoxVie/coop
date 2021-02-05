<template>
<div>

    <h1 class="title is-1">Se connecter</h1>

    <div class="Form">
        <form @submit.prevent="seConnecter">
            <div class="mail">
                <p class="subtitle is-5"> Saisir votre email</p>
                <input class="input is-primary is-rounded" v-model="email" type="email" placeholder="Mail" required>
            </div>
            <br>
            <div class="Pwd">
                <p class="subtitle is-5"> Saisir votre mot de passe</p>
                <input class="input is-primary is-rounded" v-model="password" type="password" placeholder="Mot de passe" required>
            </div>
            <br>
            <button class="button is-primary">Connexion</button>
            <p><router-link to='creer-Compte'>Créer un compte</router-link></p>
        </form>
    </div>

  

</div>

    
</template>
<script>
export default {
    data() {
        return {
            email : '',
            password : ''
        }
    },

    methods: {
        seConnecter(){
            api.post('members/signin', {
                email: this.email,
                password : this.password
            }).then(response => {
                this.$store.commit('setMembre', response.data.member);
                this.$store.commit('setToken', response.data.token);
                this.$router.push('/Conversations')
            }).catch(error => {
                alert(error.response.data.message)
            })
            
        }
    },
}
</script>

<style>

.Form{
    box-shadow: 2px 5px 20px black;
    border-radius: 5%;
    margin: 0 auto;
    border : 1px solid #96EBDB;
    width : 50%;
    height : 100%;
    
}

.Form p{
     margin-bottom: 30px;
}

.Form div.mail p{
    margin-top : 30px;
}
div.mail .input{
    
    width : 60%;
}

div.Pwd .input{
    width : 60%;
   
}
h1{
    margin-top : 100px;
}
</style>