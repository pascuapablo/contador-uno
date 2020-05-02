<template>
  <div>
    <div>
      <p class="ferstyle">hola fer</p>
    </div>
    <span>{{holaFer()}} </span>
    <p>{{"hola " + ferVariable}}</p>
    <button @click="chaufer()"> boton</button>
  </div>
</template>

<script>
  export default {
    name: "FerComponent",
    props: {
      ferprop: String
    },
    data() {
      return {
        ferVariable: "jk"
      }
    },
    computed:{
      variableComputada: function () {
        return   "Saco un dato del store";
      }
    },
    methods: {
      holaFer: function () {
        this.ferVariable = "Saco un dato del store";
        return "hola Fer";
      },
      chaufer: function () {
        this.ferVariable = "pepito";
        return "chauFer"
      }
    },
    mounted: function () {
      this.ferVariable = "jas"
    }
  }
</script>

<style scoped>
  .ferstyle {
    background: red;
  }
</style>
