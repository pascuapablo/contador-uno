<template>
  <div id="app">
    <div class="notch">
      <h1>Contador de Uno</h1>
    </div>
    <div class="action-buttons-container">
      <el-button type="primary" circle>
        <font-awesome-icon icon="user-plus" @click="openAddNewUserModal"/>
      </el-button>
      <el-button type="danger" circle>
        <font-awesome-icon icon="redo-alt" @click="openResetGameWarningModal"/>
      </el-button>

    </div>
    <div class="card-container">
      <card v-for="(user, index) in sortedUsers"
            :key="user.name"
            :name=user.name
            :position="index + 1"
            :color=user.color
            :sub-color=user.subcolor
            :score=user.score></card>
    </div>
  </div>
</template>

<script>
  import card from './components/card'
  export default {
    name: 'App',
    data() {
      return {
        dialogVisible: false,
        colors: ["#00A1DE", "#FF6319", "#6CBE45", "#ae6abb", "#8e6758", "#f7bb07", "#808183", "#eb444b", "#00933C", "#ff59d3"],
        subcolors: ["#00A1DE11", "#FF631911", "#6CBE4511", "#ae6abb11", "#8e675811", "#f7bb0711", "#80818311", "#eb444b11", "#00933C11", "#ff59d311"]
      }
    },
    methods: {
      openAddNewUserModal: function () {
        this.$prompt('Nombre', 'Nuevo jugador', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          inputType: "String",
          customClass: "messageBox",
          inputValidator: (name) => {
            return this.$store.getters.getUserByName(name) === undefined ? true : "Ese nombre ya existe"
          },
        }).then(({value}) => {
          let newUser = {
            name: value,
            score: 0,
            color: this.colors[this.$store.state.players.length % 10],
            subcolor: this.subcolors[this.$store.state.players.length % 10]
          };
          this.$store.commit("addPlayer", newUser);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });
        });
      },
      openResetGameWarningModal: function () {
        this.$confirm('Resetear todos los valores a 0 ?', {
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar',
          type: 'warning',
          customClass: "messageBox",
        }).then(() => {
          this.$store.state.players.forEach(player => {
            this.$store.commit('addScore', {name: player.name, score: -player.score})
          })
        }).catch((reason) => {

          this.$message({
            type: 'error',
            customClass: "messageBox",
            message: 'Error, intente eliminar de a uno a los jugadores'
          });
        });
      },
    },
    computed: {
      sortedUsers: function () {
        return this.$store.state.players.sort((a, b) => a.score - b.score)
      }
    },
    components: {
      card,ferComponent
    }
  }
</script>

<style lang="scss">
  #app {

    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-width: 960px;
    margin-right: auto;
    margin-left: auto;

  }

  .notch {
    background: #607D8B;
    border-radius: 2.2em;
    width: 100%;
    height: 120px;
    border-radius: 100px / 30px;
    margin-top: -54px;

    h1 {
      color: #fafafa;
      padding: 3rem;
      font-size: 1.7rem;
    }
  }

  .action-buttons-container {
    display: flex;
    justify-content: space-evenly;
    max-width: 500px;
    margin: -1.5em auto 0;

    .el-button.is-circle {
      border-color: #f3f5f6;
      border-width: 5px;
    }
  }

  .messageBox {
    font-family: sans-serif;
    width: 90% !important;
    max-width: 500px;
    margin-top: -13rem;

  }

  .card-container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
</style>
