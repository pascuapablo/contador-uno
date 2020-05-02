<template>
  <div>

    <div class="card">
      <div class="position" v-bind:style="{ background: color }">
        <div> {{position}} - {{name}}</div>
      </div>
      <div class="container" v-bind:style="{ background: subColor }">
        <p>{{score}} puntos</p>
        <div class="actions">
          <font-awesome-icon icon="calculator" style="color: dodgerblue" @click="openAddScoreModal"/>
          <font-awesome-icon icon="trash" style="color: indianred" @click="deletePlayer"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'card',
    props: {
      position: undefined,
      name: undefined,
      score: undefined,
      color: undefined,
      subColor: undefined
    },
    data() {
      return {
        dialogVisible: false,
        newScore: undefined
      }

    },
    methods: {
      openAddScoreModal: function () {
        this.$prompt('Ingrese la cantidad de puntos a sumar', 'Sumar puntos', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          inputType: "Number",
          customClass: "messageBox",
          inputErrorMessage: 'Puntaje invalido. Asegurese que sea un número'
        }).then(({value}) => {
          this.$store.commit("addScore", {name: this.name, score: value})

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });
        });
      },
      deletePlayer: function () {
        this.$confirm('Estas a punto de eliminar a ' + this.name, {
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar',
          type: 'warning',
          customClass: "messageBox",
        }).then(() => {
          this.$store.commit("deletePlayer", this.name);
        }).catch(() => {
          this.$message({
            type: 'error',
            message: 'No se pudo eliminar a ' + this.name
          });
        });
      }
    }
  }
</script>

<style lang="scss">

  .card {
    /* Add shadows to create the "card" effect */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    min-width: 300px;
    max-width: 400px;
    margin: 1em auto;


  }

  /* On mouse-over, add a deeper shadow */
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  /* Add some padding inside the card container */
  .container {
    padding: 2px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .actions {
      justify-content: space-between;
      width: 20%;
      display: flex;
    }
  }

  .position {
    background: antiquewhite;
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;

  }


</style>
