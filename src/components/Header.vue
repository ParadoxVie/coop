<template>
    <header v-if="this.$store.state.token">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                 <p class="title is-2"><router-link to="/Conversations">Co'op</router-link></p>
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    
                    <a class="navbar-item">
                        <router-link to="/Conversations">Conversation(s)</router-link>
                    </a>

                    <a class="navbar-item">
                        <router-link to="/liste-membre">Membre(s)</router-link>
                    </a>


                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div v-if="!this.$store.state.token" class="buttons">
                            <a class="button is-primary">
                                <strong><router-link to="/creer-Compte">Sign up</router-link></strong>
                            </a>
                            <a class="button is-light">
                                <router-link to="/se-connecter">Log in</router-link>
                            </a>
                        </div>
                        <div v-else class="buttons">
                            <a @click="Deconnexion" class="button is-primary">
                                <strong><router-link to="/se-connecter">Deconnexion</router-link></strong>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    methods: {
        Deconnexion(){
            this.$store.commit('seDeconnecter');
        }
    },
}
</script>

<style>
    nav{
        border-bottom : solid black 1px;
        background-color: lightblue;
    }
</style>