# Dashboard-ESP32- con html y js 

Este dashboar utiliza algunas librerias y frameforks con cdn tales como brain.js para la red neuronal, vue.js y mqtt.js para la comunicacion del esp32 con la pagina

el funcionamiento consta en lo siquiente
el esp32 envía datos que recauda de los sensores y la pagina por medio de una red neuronal evalua si debe o no hacer funcionar el motor que en este caso usamos una licuadora que simula un aspersor de agua

la finalidad es lograr que en un huerto se riegue de forma automatica cuando lo requiera gracias a la red neuronal 

para ejecutar solo tener instalado node.js 

```
node server.js

```

ademas de tener bien configurado las conecciones de los sensores al esp32 

sensores utilizados

2 tensiometros
1 sensor de lluvia
1 sensor de humedad

cabe recalcar que los tensiometros simulan las estaciones y la temperatura
puede cambiarlo y configurar los parametros en el codigo de arduino en la carpeta json

ademas de configurar los puertos de mqtt

si estas interesado en implementarlo comunicate conmigo
![Captura de la pagina de carga mientras se entrena el modelo de la red neuronal](public/carga.JPG)

![Captura del dashboard ](public/funcionamiento.JPG)

