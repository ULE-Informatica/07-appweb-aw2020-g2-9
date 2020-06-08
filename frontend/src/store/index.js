import Vue from 'vue'
import Vuex from 'vuex'
import  createPersistedState  from  'vuex-persistedstate'
import jwtDecode from  'jwt-decode'
import router from "../router"  
Vue.use(Vuex)

const axios = require('axios');
export default new Vuex.Store({
  state: {
    username: '',
    fullName: 'Matt Maribojoc',
    id: 0,
    hidden: false,
    resultados: [],
    popularMovies:[],
    popularSeries:[],
    trending:[],
    listas:[],
    etiquetas:[],
    peliculas:[] ,
    listaPeliculas:[]
  },
  mutations: {
    llenarResultados(state,resultadosObtenidos){
      console.log('cambiando resultados');
      state.resultados= resultadosObtenidos;
    },

    añadirResultados(state,resultadosObtenidos){
      state.resultados.concat(resultadosObtenidos);
    },

    llenarPopularMovies(state,resultadosObtenidos){
      
      state.popularMovies= resultadosObtenidos;
    },

    llenarPopularSeries(state,resultadosObtenidos){
      
      state.popularSeries= resultadosObtenidos;
    },

    llenarTrending(state,resultadosObtenidos){
      
      state.trending= resultadosObtenidos;
    },

    llenarListas(state,resultadosObtenidos){
      console.log('cambiando listas');
      state.listas= resultadosObtenidos;
      console.log(state.listas);
      
    },

    llenarEtiquetas(state,resultadosObtenidos){
      console.log('cambiando etiquetas');
      state.etiquetas= resultadosObtenidos;
    },

    llenarPeliculas(state,resultadosObtenidos){
      console.log('cambiando etiquetas');
      state.peliculas= resultadosObtenidos;
    },

    llenarListasPeliculas(state,resultadosObtenidos){
      console.log('cambiando lista-pelicuals');
      state.listaPeliculas= resultadosObtenidos;
    },

    pasarLogin(state){      
      const token = localStorage.userToken;
      const decoded = jwtDecode(token);
      state.id= decoded.id;
      router.push("/")  
    },

    cambiarID(state){
      const token = localStorage.userToken;
      const decoded = jwtDecode(token);
      state.id= decoded.id;
      console.log("Cambiando"+state.id);
      state.hidden=true;
    },

    eliminarID(state){
      state.id= 0;
      state.hidden=false;
    },

    restartStates(state){
      state.id= 0,
      state.hidden= false,
      state.resultados= [],
      state.resultadosSeries=[],
      state.popularMovies=[],
      state.popularSeries=[],
      state.trending=[],
      state.listas=[],
      state.etiquetas=[],
      state.peliculas=[] ;
      state.listaPeliculas=[]
    }
  },
  actions: {
    getPopularMovies: async function({ commit } ){
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d3500b9561bcc274c208215eeec7093b&language=es-ES&page=1')
      .then( (response) => {
        const resultados = response.data.results;
        commit('llenarPopularMovies',resultados);
      })
      .catch( (error) => {
        console.log(error);
      });
    },
    
    getPopularSeries: async function({ commit } ){
      axios.get('https://api.themoviedb.org/3/tv/popular?api_key=d3500b9561bcc274c208215eeec7093b&language=es-ES&page=1')
      .then( (response) => {
        const resultados = response.data.results;
        commit('llenarPopularSeries',resultados);
      })
      .catch( (error) => {
        console.log(error);
      });
    },

    getTrending: async function({ commit } ){
      axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=d3500b9561bcc274c208215eeec7093b&language=es-ES&page=1')
      .then( (response) => {
        const resultados = response.data.results;
        commit('llenarTrending',resultados);
      })
      .catch( (error) => {
        console.log(error);
      });
    },

    getResultados: async function({ commit },titulo ){      
      console.log('entre'+JSON.stringify(titulo ));
      //console.log(resultados);
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=d3500b9561bcc274c208215eeec7093b&query='+titulo)
      .then( (response) => {
        // handle success
        const resultados = response.data.results;
        commit('llenarResultados',resultados);
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      });
    },

    getResultadosSeries: async function({ commit },titulo ){      
      console.log('entre'+JSON.stringify(titulo ));
      //console.log(resultados);
        axios.get('https://api.themoviedb.org/3/search/tv?api_key=d3500b9561bcc274c208215eeec7093b&query='+titulo)
      .then( (response) => {
        const resultados = response.data.results;
        commit('añadirResultados',resultados);
      })
      .catch( (error) => {
        console.log(error);
      });
    },
    
    getListas: async function({ commit } ){
      console.log("eiquetas de :" + this.state.id );      
      axios.get('/lista', 
      {
        params: {
          id: this.state.id
        }
      })
      .then( (response) => {
        const resultados = response.data;
        console.log("Se obtuvo:");
        
        console.log(resultados);
        
        commit('llenarListas',resultados);
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      });
    },

    getPeliculasLista:async function({ commit } ){
      axios.get('lista/allPeliculas',{
      params: {
        id: this.state.id
      }
      })
      .then( (res) => {
        console.log("Este usuario tiene estas listasXXX");
        const resultados=res.data;
        commit('llenarListasPeliculas',resultados);
      })
      .catch( (error) => {
        console.log(error);
      });
    },
    /*
    getEtiquetas: async function({ commit } ){
      axios.get('/etiqueta')
      .then( (response) => {
        const resultados = response.data.results;
        commit('llenarEtiquetas',resultados);
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      });
    },
    */

    getPeliculas: async function({ commit } ){
      axios.get('/pelicula')
      .then( (response) => {
        const resultados = response.data.results;
        commit('llenarPeliculas',resultados);
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      });
    },

    getUsuario: async function({ commit },usuario ){
      axios.post('/login', usuario)
      .then( (res) => {
        console.log("paso login index");        
        // handle success
        localStorage.setItem('userToken',res.data );
        commit('pasarLogin');
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      });
    },

    setUsuario: function({ commit } ){
      console.log("CAMBIO");      
      commit('cambiarID');
    },

    deleteStates: function({ commit } ){
      commit('restartStates');
    },

    cerrarSession:  function({ commit } ){    
                   
      axios.get("/login/logout")    
      .then(function(){              
        localStorage.clear();
        commit('restartStates');
        router.push('/Login');

      })    
      .catch((errors) => {    
          console.log(errors)    
          router.push("/") 
      })    
    }  
  },
  plugins: [createPersistedState({})]
})

