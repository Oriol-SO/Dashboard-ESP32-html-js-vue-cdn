/*
var config = {
  apiKey: "AIzaSyBfDRFn7IyUZDQCSNAS0bQ-lbWOk4pRrY0",
  authDomain: "proyectoesp32-1d1f2.firebaseapp.com",
  projectId: "proyectoesp32-1d1f2",
  storageBucket: "proyectoesp32-1d1f2.appspot.com",
  messagingSenderId: "490357321719",
  appId: "1:490357321719:web:4a76511edeffcfa5f0c8f2",
  measurementId: "G-CM1PV9R4TF"
};
firebase.initializeApp(config);
const db = firebase.firestore();*/
var valorslider1=0

let app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    client: mqtt.connect("ws://broker.emqx.io:8083/mqtt"),
    estado_boton: 0,
    temperatura:23,
    humedad:37,
    limite:'',
    tension:0,
    valorslider:0,
    valorslidermenor:0,
    estado_motor:0,
    colorcab:'red',
    
     //: new Audio("audio.mp3"),
    publish: {
      topic: 'oriolport/02',
      qos: 0,
      payload: '0',
    },
    
  },mounted(){

    /*
    db.collection("tension").doc('Cp1EZMP8tdMUpG0AZBTZ')
    .onSnapshot((doc) => {
        var dato=doc.data();

           this.valorslider=dato.valor2;
           this.valorslidermenor=dato.valor1;

    });*/
    this.client.on('connect', ()=>{
      console.log('conectado')
      this.client.subscribe('oriolport/01',(err)=> {
        if (!err) {
          this.client.publish('oriolport/02', '0')
        }
      })
    })
      this.client.on('message',(topic, message)=>{
        // message is Buffer
        if(topic=='oriolport/01'){
          //console.log(message.toString())
          let js=message.toString();
          let tension=JSON.parse(js);
          console.log(tension)
          this.tension=tension.tension;
        }
      })
    
  },   
  computed:{
    color() {
      if (this.tension < 100) return '#90CAF9'
      if (this.tension < 250) return '#42A5F5'
      if (this.tension < 500) return '#1565C0'
      if (this.tension < 750) return '#26C6DA'
      if (this.tension < 1000) return '#00ACC1'
      if (this.tension < 1250) return '#00838F'
      if (this.tension < 1500) return '#80DEEA'
      if (this.tension < 1750) return '#1DE9B6'
      if (this.tension < 2000) return '#66BB6A'
      if (this.tension < 2100) return '#69F0AE'
      if (this.tension < 2250) return '#00E676'
      if (this.tension < 2500) return '#76FF03'
      if (this.tension < 2750) return '#B2FF59'
      if (this.tension < 3000) return '#F4FF81'
      if (this.tension < 3100) return '#EEFF41'
      if (this.tension < 3250) return '#FFEE58'
      if (this.tension < 3500) return '#FBC02D'
      if (this.tension < 3750) return '#FF8F00'
      if (this.tension < 4000) return '#FF7043'
      if (this.tension < 4095) return '#673AB7'
      return  'red'
    },
    tensiometro(){
      //return this.slid;
      //this.valorslider=this.tension;
      if( this.tension<this.valorslider && this.tension>this.valorslidermenor){
        this.estado_motor=1;
        this.colorcab='amber darken-1';
      }else{
        this.estado_motor=0;
        this.colorcab='pink accent-3';
      }
      return (this.tension*100/4995).toFixed(1);
      
    },
    enviartensionmayor(){
      if(this.valorslider>this.valorslidermenor){
          var limite='{"tipo":"tension","tension1" :'+this.valorslider+',"tension2":'+this.valorslidermenor+'}';
          //this.connection.send(limite);
      }

    }
    
  },        
  methods:{

    guardar(){
      /*
      db.collection("tension").doc("Cp1EZMP8tdMUpG0AZBTZ").set({
        valor1:this.valorslidermenor,
        valor2:this.valorslider,
      })
      .then(() => {
          console.log("Datos guardados");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });*/
    },
     
    
    botonOn(){
      this.estado_boton = '1'; 
      console.log("Led is ON")
      this.enviarDato()
      //this.audio.play();
    },
    botonOff(){
      this.estado_boton = '0';
      console.log("Led is OFF")
      this.enviarDato()
    },
    enviarDato(){
      this.publish.payload=this.estado_boton;
      const { topic, qos, payload } = this.publish;
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log('Publish error', error)
        }
      })
      //var led_estado = '{"tipo":"led","Led" :'+this.estado_boton+'}'
      // this.connection.send(led_estado)
    },
    enviarlimite(){
      if(!isNaN(this.limite)){ 
        console.log(this.limite);
        var limite1='{"tipo":"limite","limite1" :'+this.limite+'}';
       // this.connection.send(limite1);
      }

    },
    prendermotor(){
      this.estado_motor=1;
      var motor='{"tipo":"motor","motor" :'+1+'}';;
      //this.connection.send(motor);
    },
    apagarmotor(){
      this.valorslider=1;
      this.valorslidermenor=0;
      this.estado_motor=0;
      var motor='{"tipo":"motor","motor" :'+0+'}';;
     // this.connection.send(motor);
    }


  }
});




      



