<template>
  <div v-if="services.length > 0">
    <gmap-map :zoom="14" :center="{lat: services[0].latLng.lng, lng: services[0].latLng.lat}" class="mapa mb-5">
      <gmap-marker
        v-for="(service, index) of services"
        :key="index"
        :position="{lat: service.latLng.lng, lng: service.latLng.lat}"
      />
    </gmap-map>
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      services: [
        {
          createdAt: 'Servicio 1',
          latLng: {
            lng: -25.363545,
            lat: -49.210115
          }
        }
      ],
      message: ''
    }
  },
  mounted () {
    console.log('refresh')
    this.getServices()
  },
  methods: {
    getServices () {
      setInterval(async () => {
        this.message = 'Atualizando!'
        await this.$axios.$get('http://3.208.92.213:5000/cars/getCarHistoryAll').then((response) => {
          this.services = []
          for (const item of response) {
            this.services.push({
              createdAt: item.createdAt,
              latLng: {
                lat: item.latLng.lng,
                lng: item.latLng.lat
              }
            })
          }
        })
        this.message = ''
      }, 5000)
    }
  }
}

</script>
<style>
.mapa {
  height: 95vh;
  width: 100%;
}
</style>
