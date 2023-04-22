<template>
    <div>
        <div class="flex items-center justify-center h-screen mt--3">
            <div class="sm:w-1/2">
                <div class="p-5 w-4/5 mx-auto text-left font-raleway">

                    <h1 class="font-bold text-left font-montserrat text-4xl sm:text-6xl mb-10 c-lila">
                        Inicio de sesion
                    </h1>
                    <p v-show="!error">Debes introducir el correo electronico y la contrasena con la que te registrastes, al
                        ser una prueba no se ha implementado el metodo de registro.</p>
                    <p v-show="error" class="text-sm text-red-500">{{ errorMsg }}</p>
                    <form @submit.prevent="handleLogin">
                        <div class="my-5">
                            <h1 class="text-left font-bold mb-5 font-montserrat">Correo electronico</h1>
                            <input type="email" v-model="email"
                                class="text-sm outline-none pb-5 w-4/5 bg-transparent border-b hover:border-blue-700 focus:border-blue-700">
                        </div>
                        <div class="my-5">
                            <h1 class="text-left font-bold mb-5 font-montserrat">Contrasena</h1>
                            <input type="password" v-model="password"
                                class="text-sm outline-none pb-5 w-4/5 bg-transparent border-b hover:border-blue-700 focus:border-blue-700">
                        </div>

                        <button type="submit" :disabled="password.length < 3"
                            class="bg-lila p-2 mt-50 text-white fs-3 border-none rounded pointer b-hover">
                            Entrar
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { mapActions } from 'vuex';

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            error: false,
            errorMsg: `Credenciales incorrectas, por favor, intentalo de nuevo.`
        }
    },
    methods: {
        ...mapActions(['login']),

        async handleLogin() {
            const success = await this.login({ email: this.email, password: this.password });
            if (success) {
                this.$router.push('/index');
            } else {
                this.error = true;
            }
        }
    }
}
</script>
<style scoped>
.border-none {
    border: none;
}

.mr-4 {
    margin-right: 50px;
}

.fs-3,
.fs-3:before,
.mdi-24px.mdi-set,
.mdi-24px.mdi:before {
    font-size: 2em !important;
}

/* Estilos para la imagen de fondo */
.bg-cover {
    background-position: center;
    background-repeat: no-repeat;
}

.rounded {
    border-radius: 10px;
}

/* Estilos para el contenedor de errores */
.text-red-500 {
    color: #ef4444;
}

.mt--3 {
    margin-top: -100px;
}

.mt-50 {
    margin-top: 50px;
}

/* Estilos para el formulario */
form {
    display: flex;
    flex-direction: column;
}

form input {
    border: none;
    border-bottom: 1px solid #e5e7eb;
}

form input:focus,
form input:hover {
    border-bottom: 1px solid #2563eb;
}

form button[disabled] {
    opacity: 0.5;
    pointer-events: none;
}

.flex {
    display: flex;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.h-screen {
    height: 100vh;
}

.sm\:w-1\/2 {
    width: 50%;
}

@media (max-width: 800px) {
    .sm\:w-1\/2 {
        width: 100%;
    }
}

.p-5 {
    padding: 1.25rem;
}

.p-2 {
    padding: 0.25rem;
}

.w-4\/5 {
    width: 80%;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.text-left {
    text-align: left;
}

.font-raleway {
    font-family: 'Raleway', sans-serif;
}

.font-bold {
    font-weight: bold;
}

.font-montserrat {
    font-family: 'Montserrat', sans-serif;
}

.text-4xl {
    font-size: 2.25rem;
}

.sm\:text-6xl {
    font-size: 3rem;
}

.mb-10 {
    margin-bottom: 2.5rem;
}

.text-sm {
    font-size: 0.875rem;
}

.text-red-500 {
    color: #EF4444;
}

.my-5 {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
}

.mb-5 {
    margin-bottom: 1.25rem;
}

.pb-5 {
    padding-bottom: 1.25rem;
}

.bg-transparent {
    background-color: transparent;
}

.border-b {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #E5E7EB;
}

.hover\:border-blue-700:hover {
    border-color: #1E40AF;
}

.focus\:border-blue-700:focus {
    border-color: #1E40AF;
    outline: none;
}

.c-lila {
    color: #7957d5;
}

.bg-lila {
    background-color: #7957d5;
}

.b-hover:hover{
    background-color: #5e44a5;
}

.p-5 {
    padding: 1.25rem;
}

.text-white {
    color: #fff;
}

.my-2 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.router-link {
    text-decoration: none;
    color: #1F2937;
}

.router-link:hover {
    color: #1E40AF;
}

.router-link:focus {
    outline: none;
    color: #1E40AF;
}</style>