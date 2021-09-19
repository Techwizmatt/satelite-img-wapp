<template>
  <section>
    <input id="recording" type="file">
    <button @click="submit">Upload</button>
    <h3>{{ message }}</h3>
    <img :src="image" alt="Rendered Image will go here" >
  </section>
</template>

<script>
export default {
  data: () => ({
    image: String(),
    message: String()
  }),
  methods: {
    submit: async function () {
      this.message = 'Starting... '
      const formData = new FormData()
      const recording = document.querySelector('#recording')
      formData.append('recording', recording.files[0])

      this.$http.post('/recording', formData, {
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
          const progress = Math.ceil((progressEvent.loaded * 100) / totalLength)
          if (progress <= 99) {
            this.message = `Uploading: ${progress} %`
          } else {
            this.message = 'Waiting for response...'
          }
        },
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        const base64 = Buffer.from(response.data, 'binary').toString('base64')
        console.log(response)
        this.message = 'Success'

        this.image = `data:image/png;base64, ${base64}`
      }).catch(error => {
        this.message = error
      })
    }
  }
}
</script>

<style scoped>
  img { height: calc(100vh - 10em); max-width: calc(100vw - 20em) }
</style>
