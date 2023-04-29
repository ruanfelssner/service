<template>
  <div class="container">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-auto">
        <form class="text-center">
          <hr>
          <h1>Bem-vindo(a) à Auzza Capital</h1>
          <p>Faça login inserindo as informações abaixo</p>
          <input
            v-model="email"
            name="email"
            type="text"
            class="mb-2"
            placeholder="Seu email:"
          >
          <input
            v-model="password"
            name="password"
            type="password"
            class="mb-2"
            placeholder="Sua senha:"
          >
          <button type="button" class="mb-4" @click="login()">
            Login <i class="fa-solid fa-arrow-right" />
          </button>
          <hr>
          <p>Faça seu login com o Google:</p>
          <ButtomGoogleLogin />
          <hr>
          <p><a href="/recovery-password">Esqueceu sua senha?</a></p>
          <p>Não tem uma conta? <a href="/register">Inscreva-se</a></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>
