
let app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data(){
    return{
        dialog:false,
        sistema:true,
        led:0,
        client: mqtt.connect("ws://broker.emqx.io:8083/mqtt"),
        humedad:0,
        temperatura:0,
        lluvia:0,
        hora: 12,
        minutos: 35,
        segundos: 59,
        dia: 20,
        mes: "Octubre",
        verano: 1,
        estacion:1,
        nombreest:'Verano',
        estado_motor:0,
        tiempo:0,
       // hume:0,
        count:0,
       datos:{
            humedad:0,
            temperatura:0,
            hora:0,
            estacion:0,
            lluvia:0,
        },

        net:new brain.NeuralNetwork(),
    }
},computed:{
    hume(){
        return Math.round((((1300-this.humedad)/1400)*100))
    },
    temp(){
        return Math.round(this.temperatura/100)
    },
    hor(){
        this.obtenerhora();
        return '';
    },
},    
mounted(){
    this.net.train([
        {input:[20,80,0,16,3],output:[1]},
        {input:[28,22,0,11,4],output:[1]},
        {input:[40,26,0,8,3],output:[1]},
        {input:[25,30,0,13,4],output:[1]},
        {input:[27,3,0,15,1],output:[1]},
        {input:[25,10,0,10,2],output:[1]},
        {input:[31,7,0,16,1],output:[1]},
        {input:[36,24,0,10,1],output:[1]},
        {input:[27,5,0,9,4],output:[1]},
        {input:[30,11,0,8,1],output:[1]},
        {input:[24,28,0,15,1],output:[1]},
        {input:[36,24,0,16,1],output:[1]},
        {input:[25,4,0,10,4],output:[1]},
        {input:[35,17,0,9,3],output:[1]},
        {input:[29,10,0,8,2],output:[1]},
        {input:[26,9,0,12,3],output:[1]},
        {input:[23,17,0,14,3],output:[1]},
        {input:[37,10,0,8,3],output:[1]},
        {input:[31,19,0,10,1],output:[1]},
        {input:[29,0,0,14,4],output:[1]},
        {input:[34,9,0,12,1],output:[1]},
        {input:[26,10,0,9,1],output:[1]},
        {input:[23,2,0,10,3],output:[1]},
        {input:[36,1,0,14,2],output:[1]},
        {input:[23,19,0,8,2],output:[1]},
        {input:[36,17,0,10,1],output:[1]},
        {input:[35,8,0,12,4],output:[1]},
        {input:[30,6,0,10,4],output:[1]},
        {input:[30,11,0,8,1],output:[1]},
        {input:[30,17,0,16,2],output:[1]},
        {input:[26,24,0,12,4],output:[1]},
        {input:[26,9,0,13,4],output:[1]},
        {input:[30,23,0,8,4],output:[1]},
        {input:[26,16,0,16,2],output:[1]},
        {input:[23,17,0,9,2],output:[1]},
        {input:[33,2,0,9,1],output:[1]},
        {input:[23,21,0,9,1],output:[1]},
        {input:[26,12,0,16,2],output:[1]},
        {input:[40,4,0,12,3],output:[1]},
        {input:[25,24,0,11,1],output:[1]},
        {input:[32,22,0,13,2],output:[1]},
        {input:[32,15,0,8,4],output:[1]},
        {input:[39,18,0,15,4],output:[1]},
        {input:[34,3,0,15,1],output:[1]},
        {input:[34,30,0,9,3],output:[1]},
        {input:[34,12,0,14,2],output:[1]},
        {input:[32,11,0,13,3],output:[1]},
        {input:[31,9,0,14,1],output:[1]},
        {input:[39,3,0,11,2],output:[1]},
        {input:[26,1,0,16,3],output:[1]},
        {input:[36,13,0,11,1],output:[1]},
        {input:[31,18,0,11,1],output:[1]},
        {input:[29,11,0,16,3],output:[1]},
        {input:[36,2,0,14,1],output:[1]},
        {input:[40,22,0,14,4],output:[1]},
        {input:[30,8,0,8,1],output:[1]},
        {input:[31,17,0,8,3],output:[1]},
        {input:[37,25,0,15,1],output:[1]},
        {input:[27,14,0,8,3],output:[1]},
        {input:[30,4,0,16,4],output:[1]},
        {input:[29,15,0,8,2],output:[1]},
        {input:[35,5,0,14,4],output:[1]},
        {input:[39,7,0,15,3],output:[1]},
        {input:[27,25,0,8,3],output:[1]},
        {input:[23,30,0,13,3],output:[1]},
        {input:[31,1,0,11,1],output:[1]},
        {input:[33,2,0,9,3],output:[1]},
        {input:[30,2,0,14,2],output:[1]},
        {input:[38,24,0,8,3],output:[1]},
        {input:[36,17,0,10,4],output:[1]},
        {input:[37,21,0,12,1],output:[1]},
        {input:[28,4,0,13,3],output:[1]},
        {input:[24,0,0,15,4],output:[1]},
        {input:[34,30,0,11,4],output:[1]},
        {input:[35,20,0,16,1],output:[1]},
        {input:[32,28,0,16,4],output:[1]},
        {input:[29,21,0,8,2],output:[1]},
        {input:[33,7,0,16,3],output:[1]},
        {input:[36,28,0,16,3],output:[1]},
        {input:[25,19,0,15,4],output:[1]},
        {input:[29,8,0,11,1],output:[1]},
        {input:[34,14,0,15,1],output:[1]},
        {input:[39,18,0,15,3],output:[1]},
        {input:[40,28,0,8,4],output:[1]},
        {input:[37,22,0,13,4],output:[1]},
        {input:[37,19,0,15,3],output:[1]},
        {input:[32,8,0,9,2],output:[1]},
        {input:[29,28,0,15,2],output:[1]},
        {input:[40,16,0,16,1],output:[1]},
        {input:[31,14,0,9,4],output:[1]},
        {input:[32,8,0,13,2],output:[1]},
        {input:[36,2,0,16,1],output:[1]},
        {input:[35,28,0,14,2],output:[1]},
        {input:[34,4,0,10,3],output:[1]},
        {input:[23,5,0,9,4],output:[1]},
        {input:[23,22,0,9,1],output:[1]},
        {input:[32,0,0,12,3],output:[1]},
        {input:[30,14,0,13,3],output:[1]},
        {input:[28,17,0,8,2],output:[1]},
        {input:[39,11,0,13,1],output:[1]},
        {input:[30,7,0,11,2],output:[1]},
        {input:[39,14,0,16,2],output:[1]},
        {input:[1,15,0,16,3],output:[0]},
        {input:[9,13,0,15,2],output:[0]},
        {input:[11,6,1,8,4],output:[0]},
        {input:[7,6,1,13,1],output:[0]},
        {input:[13,4,1,16,2],output:[0]},
        {input:[6,10,0,8,3],output:[0]},
        {input:[15,20,1,10,4],output:[0]},
        {input:[14,19,1,16,3],output:[0]},
        {input:[13,10,1,11,2],output:[0]},
        {input:[9,18,1,13,3],output:[0]},
        {input:[12,26,0,10,2],output:[0]},
        {input:[8,11,1,12,3],output:[0]},
        {input:[14,0,1,12,4],output:[0]},
        {input:[10,5,0,9,3],output:[0]},
        {input:[3,21,1,11,2],output:[0]},
        {input:[12,12,0,11,3],output:[0]},
        {input:[2,26,0,8,3],output:[0]},
        {input:[9,0,0,15,1],output:[0]},
        {input:[10,27,0,8,2],output:[0]},
        {input:[11,8,1,13,4],output:[0]},
        {input:[10,30,1,14,2],output:[0]},
        {input:[13,19,0,16,2],output:[0]},
        {input:[8,8,0,11,3],output:[0]},
        {input:[14,14,0,9,4],output:[0]},
        {input:[9,4,1,16,2],output:[0]},
        {input:[12,26,0,12,4],output:[0]},
        {input:[14,4,0,9,1],output:[0]},
        {input:[5,13,0,16,2],output:[0]},
        {input:[6,27,1,15,1],output:[0]},
        {input:[11,18,1,14,3],output:[0]},
        {input:[9,6,0,16,3],output:[0]},
        {input:[3,4,1,9,2],output:[0]},
        {input:[11,24,1,10,3],output:[0]},
        {input:[3,15,1,13,4],output:[0]},
        {input:[11,19,1,10,1],output:[0]},
        {input:[6,30,0,8,3],output:[0]},
        {input:[2,16,1,12,4],output:[0]},
        {input:[0,26,1,16,3],output:[0]},
        {input:[9,18,0,13,3],output:[0]},
        {input:[11,28,1,14,3],output:[0]},
        {input:[8,20,0,15,3],output:[0]},
        {input:[5,16,0,13,2],output:[0]},
        {input:[6,27,0,9,1],output:[0]},
        {input:[6,0,1,13,3],output:[0]},
        {input:[0,28,0,14,2],output:[0]},
        {input:[9,28,1,9,1],output:[0]},
        {input:[4,19,1,8,3],output:[0]},
        {input:[3,23,0,9,4],output:[0]},
        {input:[17,6,0,8,1],output:[1]},
        {input:[17,4,0,9,1],output:[1]},
        {input:[20,3,0,13,1],output:[1]},
        {input:[19,3,0,13,1],output:[1]},
        {input:[19,6,0,12,1],output:[1]},
        {input:[19,5,0,14,1],output:[1]},
        {input:[17,3,0,13,1],output:[1]},
        {input:[17,4,0,8,1],output:[1]},
        {input:[19,9,0,14,1],output:[1]},
        {input:[16,3,0,8,1],output:[1]},
        {input:[20,9,0,8,1],output:[1]},
        {input:[20,9,0,11,1],output:[1]},
        {input:[19,10,0,8,1],output:[1]},
        {input:[20,7,0,9,1],output:[1]},
        {input:[15,6,0,14,1],output:[1]},
        {input:[19,2,0,13,1],output:[1]},
        {input:[17,1,0,10,1],output:[1]},
        {input:[19,7,0,9,1],output:[1]},
        {input:[17,8,0,11,1],output:[1]},
        {input:[20,5,0,8,1],output:[1]},
        {input:[16,0,0,12,1],output:[1]},
        {input:[15,0,1,8,1],output:[0]},
        {input:[17,5,1,13,1],output:[0]},
        {input:[19,4,1,14,1],output:[0]},
        {input:[19,0,1,10,1],output:[0]},
        {input:[20,1,1,11,1],output:[0]},
        {input:[17,3,1,8,1],output:[0]},
        {input:[19,8,1,13,1],output:[0]},
        {input:[17,4,1,14,1],output:[0]},
        {input:[17,6,1,11,1],output:[0]},
        {input:[16,5,1,8,1],output:[0]},
        {input:[19,7,1,13,1],output:[0]},
        {input:[20,9,1,12,1],output:[0]},
        {input:[20,6,1,10,1],output:[0]},
        {input:[17,6,1,14,1],output:[0]},
        {input:[20,10,1,8,1],output:[0]},
        {input:[20,2,1,8,1],output:[0]},
        {input:[15,10,1,11,1],output:[0]},
        {input:[19,6,1,11,1],output:[0]},
        {input:[19,4,1,14,1],output:[0]},
        {input:[15,9,1,9,1],output:[0]},
        {input:[18,2,1,10,1],output:[0]},
        {input:[16,3,1,13,1],output:[0]},
        {input:[16,8,1,11,1],output:[0]},
        {input:[16,2,1,12,1],output:[0]},
        {input:[20,2,1,8,1],output:[0]},
        {input:[19,6,1,9,1],output:[0]},
        {input:[16,5,1,13,1],output:[0]},
        {input:[20,3,1,11,1],output:[0]},
        {input:[18,10,1,14,1],output:[0]},
        {input:[19,3,1,14,1],output:[0]},
        {input:[17,0,1,14,1],output:[0]},
        {input:[20,4,1,9,1],output:[0]},
        {input:[31,7,0,10,3],output:[1]},
        {input:[30,10,1,14,1],output:[1]},
        {input:[25,4,0,10,1],output:[1]},
        {input:[26,8,1,11,3],output:[1]},
        {input:[31,3,0,14,2],output:[1]},
        {input:[28,0,1,13,1],output:[1]},
        {input:[25,3,0,13,4],output:[1]},
        {input:[33,5,1,10,1],output:[1]},
        {input:[37,0,0,8,1],output:[1]},
        {input:[30,4,1,10,3],output:[1]},
        {input:[39,8,0,12,1],output:[1]},
        {input:[37,10,1,11,1],output:[1]},
        {input:[36,9,1,13,2],output:[1]},
        {input:[33,1,0,10,3],output:[1]},
        {input:[26,4,1,12,4],output:[1]},
        {input:[27,4,0,14,2],output:[1]},
        {input:[30,3,1,8,3],output:[1]},
        {input:[30,5,0,13,4],output:[1]},
        {input:[40,6,1,14,1],output:[1]},
        {input:[38,9,0,11,4],output:[1]},
        {input:[38,1,1,11,3],output:[1]},
        {input:[40,0,0,11,1],output:[1]},
        {input:[39,9,1,11,3],output:[1]},
        {input:[38,4,0,8,1],output:[1]},
        
        

        
    ])

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
            if(topic=='oriolport/01' && this.sistema){
                //console.log(message.toString())
                let js=message.toString();
                let cadena=JSON.parse(js);
                //console.log(cadena)
                this.humedad=cadena.hume;
                this.lluvia=cadena.lluvia?0:1;
                this.temperatura=cadena.temp;
                this.tiempo=cadena.hora;
               // this.estado_motor=1;
               // console.log(this.lluvia)
                if(this.count==4){
                    this.count=0;
                    this.ejecutor();
                }
                this.count++;
            }else{
                this.humedad=0;
                this.lluvia=0;
                this.temperatura=0;
                this.estado_motor=0;
            }

            //setInterval(this.ejecutor(),5000)
        })


},methods:{
    prenderled(){
        let l=this.led?'1':'0';
          this.client.publish('oriolport/02', 'e'+l)
    },
    estado_sistema(){
        let s=this.sistema?'1':'0';
        if(s=='0'){
          this.client.publish('oriolport/02', 'm0')
        }
    },
 
    obtenerhora(){
        this.hora=Math.round(this.tiempo/170);
        //let hor=Math.round(this.tiempo/24);
        let rangmin=Math.round(this.tiempo%170);
        let min=Math.round((rangmin*60)/170)
        this.minutos=min;
    }
    ,
    prender_motor(){
        let s=this.estado_motor?'1':'0';
        this.client.publish('oriolport/02', 'm'+s)
    },
    cambiarestacion(es){
        switch(es){
            case 1:
                this.nombreest='Verano';
                this.estacion=1;
                break;
            case 2:
                this.nombreest='Invierno';
                this.estacion=2;
                break;
            case 3:
                this.nombreest='Otoño';
                this.estacion=3;
                break;
            case 4:
                this.nombreest='Primavera';
                this.estacion=4;
                break;
            default :
                break;
        }
    },
    ejecutor(){
            this.datos.humedad=Math.round((((1300-this.humedad)/1400)*100));
            this.datos.temperatura= Math.round(this.temperatura/100);
            this.datos.hora=Math.round(this.tiempo/170);
            this.datos.estacion=this.estacion;
            this.datos.lluvia=this.lluvia;
            console.log(this.datos);
            console.log([this.datos.temperatura,this.datos.humedad,this.datos.lluvia,this.datos.hora,this.datos.estacion])
            var ejec=this.net.run([this.datos.temperatura,this.datos.humedad,this.datos.lluvia,this.datos.hora,this.datos.estacion]);
            console.log(ejec[0]);

            var motor=Math.round(ejec[0]);
            console.log(motor)
            this.estado_motor=motor;
            this.client.publish('oriolport/02', 'm'+motor)
        
    }
}

});




      



