// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCalculator, faPencilAlt, faTrash,faUserPlus,faRedoAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);
Vue.use(ElementUI);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

const store = new Vuex.Store({
  state: {
    players: []
  },
  getters: {
    getUserByName: function (state, name) {
      return state.players.find(player => player.name.toUpperCase() === name.toUpperCase())
    }
  },
  mutations: {
    addPlayer: function (state, user) {
      let playersWithSameName = state.players.filter(player => {
        return player.name.toUpperCase() === user.name.toUpperCase();
      });
      if (playersWithSameName.length === 0) {
        user.score = 0;
        state.players.push(user)
      }
    },
    deletePlayer: function (state, name) {
      let index = state.players.findIndex(player => {
        return player.name.toUpperCase() === name.toUpperCase();
      });
      if (index !== -1) {
        state.players.splice(index, 1);
      }
    },
    addScore: function (state,obj) {
      const name = obj.name;
      const scoreToAdd = obj.score;
      let index = state.players.findIndex(player => player.name.toUpperCase() === name.toUpperCase());
        if(index !== undefined){
            let editedPlayer = state.players[index];
            editedPlayer.score = parseInt(editedPlayer.score) + parseInt(scoreToAdd);
            state.players.splice(index,1,editedPlayer)
        }
    }
  },
  plugins: [(vuexLocal).plugin]
});


library.add(faCalculator)
library.add(faTrash)
library.add(faPencilAlt)
library.add(faUserPlus)
library.add(faRedoAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: {App},
  template: '<App/>'
})
