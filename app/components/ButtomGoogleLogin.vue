<template>
  <div class="d-flex justify-content-center">
    <div id="googleButton" :class="disabled ? 'disabledButton' : ''" />
  </div>
</template>

<script>

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    createdUser: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  mounted () {
    const google = window.google
    google.accounts.id.initialize({
      client_id: this.$config.googleClientId,
      callback: this.handleCredentialResponse,
      context: 'signin'
    })
    google.accounts.id.renderButton(document.getElementById('googleButton'), {
      type: 'standard',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'center',
      width: 250
    })
  },
  methods: {
    handleCredentialResponse (response) {
      console.log(response.credential)
    }
  }
}
</script>
