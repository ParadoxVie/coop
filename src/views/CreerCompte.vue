<template>
    <div>

        <h1 class="title is-1">Créer un compte</h1>

        <div class="Form">
            <form @submit.prevent="creerCompte">
                <div class="name">
                <input class="input is-primary is-rounded" v-model="fullname" type="text" placeholder="Nom" required>
                <br><br>
                </div>
                <div class="mail">
                <input class="input is-primary is-rounded" v-model="email" type="email" placeholder="Votre Email" required>
                <br><br>
                </div>
                <div class="Pwd">
                <input class="input is-primary is-rounded" v-model="password" type="password" placeholder="Mot de passe" required>
                <br><br>
                <input class="input is-primary is-rounded" v-model="password2" type="password" placeholder="Mot de passe à nouveau" required>
                <br><br>
                </div>
                <button class="button is-primary">Créer mon compte</button>
            </form>

        </div>
        
    </div>

</template>

<script>
export default {
    data(){
        return{
            fullname : "",
            email :"",
            password : "",
            password2 : ""
        }
    },
    methods: {
        creerCompte(){

            if(this.password === this.password2){

                api.post('members', {
                    fullname : this.fullname,
                    email : this.email,
                    password : this.password
                }).then(response => {
                    alert('Votre compte a été créer ! Vous pouvez vous connecter à Coop');
                    this.$router.push('/se-connecter');
                }).catch(error => {
                    alert(error.response.data.message)
                })
                
            }else{
                alert('Veuillez re saisir votre mot de passe');
                this.password = "";
                this.password2 = "";
            }

        }
    },
}
</script>

<style>

h1{
    margin-top:100px;
}

.Form{
    box-shadow: 2px 5px 20px black;
    border-radius: 5%;
    margin: 0 auto;
    border : 1px solid #96EBDB;
    width : 50%;
    height : 100%;
    
}

.Form button{
     margin-bottom: 30px;
}

.Form div.name .input{
    margin-top : 30px;
    width : 60%;
}
div.mail .input{
    
    width : 60%;
}

div.Pwd .input{
    width : 60%;
   
}
</style>