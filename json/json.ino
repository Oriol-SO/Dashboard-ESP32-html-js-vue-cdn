#define MSG_BUFFER_SIZE  (50)
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h> 
#include <Ticker.h>
#define TENSIOMETRO 13
#define DHTPIN 24
#define MOTOR 21
#define Led 2
#define HUMEDAD 35
#define TEMPERATURA 32
#define LLUVIAS 33
#define HORAS 34



#define DHTTYPE    DHT11
DHT dht(DHTPIN, DHTTYPE);


//void enviarDatosSensor();
void enviarDatosTension();
int limite;
int limite1;
int limite2;
int ten;

int humedad;
int lluvia;
int temperatura;
int hora;

char msg[MSG_BUFFER_SIZE];
Ticker timer;
const char* ssid     = "Eduardo";
const char* password = "123456789";

const char* mqtt_server ="broker.emqx.io";
const int mqtt_port = 1883;
const char *mqtt_user = "oriol";
const char *mqtt_pass = "jklsimon";

WiFiClient espClient;
PubSubClient client(espClient);


void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("conectado a: ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("conectadoa wifi");
  Serial.println("IP : ");
  Serial.println(WiFi.localIP());
}


void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("mensaje desde: [");
  Serial.print(topic);
  Serial.print("] ");

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
        if ((char)payload[0] == 'e'){
            if ((char)payload[1] == '1'){
              digitalWrite(Led, 1); 
              Serial.print("prendido ");
            }else{
              digitalWrite(Led, 0); 
              Serial.print("apagado ");
            }

        }else if((char)payload[0] == 'm'){
           if ((char)payload[1] == '1'){
              digitalWrite(MOTOR,LOW);
              Serial.print("prendido ");
            }else{
               digitalWrite(MOTOR,HIGH); 
              Serial.print("apagado ");
            }
        }
  }


void setup(void)
{
  
  Serial.begin(115200);
  pinMode(Led, OUTPUT);
  pinMode(LLUVIAS, INPUT);
  pinMode(MOTOR,OUTPUT);
  digitalWrite(MOTOR, HIGH);
 
  dht.begin();
  
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  timer.attach(1,enviarDatosTension);
 // timer.attach(1,enviarDatosSensor); // Ticker timer (Llama funciones en un intervalo establecido)
}

void reconnect() {
  //intentar reconectar
  while (!client.connected()) {
    Serial.print("intentando reconectar...");
    // Crear id de topic
    String clientId = "ESP32SIMONClient-";
    clientId += String(random(0xffff), HEX);
    // conectar
    if (client.connect(clientId.c_str(),mqtt_user,mqtt_pass)) {
      Serial.println("conectado");
      // publicar
      client.publish("oriolport/01", "reconectado");
      // ... suscribirse
      client.subscribe("oriolport/02");
    } else {
      Serial.print("error, rc=");
      Serial.print(client.state());
      Serial.println("intentando en 3 segundoa¿s");
     
      delay(3000);
    }
  }
}

void loop(void) {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
void enviarDatosTension(){
    //ten= analogRead(HUMEDAD);
    humedad=analogRead(HUMEDAD);
    temperatura=analogRead(TEMPERATURA);
    lluvia=digitalRead(LLUVIAS);
    hora=analogRead(HORAS);
    if(limite1!=0 && limite2!=0){
      if(ten<limite1 && ten>limite2){
         digitalWrite(MOTOR,LOW);
      }else{
         digitalWrite(MOTOR,HIGH);
      }
    }
    
    snprintf (msg, MSG_BUFFER_SIZE,"{\"hume\":%ld,\"temp\":%ld,\"lluvia\":%ld,\"hora\":%ld}", humedad,temperatura,lluvia,hora);
    Serial.println(msg);
    client.publish("oriolport/01", msg);
}
/*
void enviarDatosSensor(){
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    if (isnan(h) || isnan(t) ) {
      Serial.println(F("Fallo de lectura en sensor DHT11!"));
      return;
      }
    if(limite!=0){
      if(t>limite){
        digitalWrite(MOTOR,LOW);
      }else{
        digitalWrite(MOTOR,HIGH);
      }
    }
   String JSON_Data = "{\"temp\":";
          JSON_Data += t;
          JSON_Data += ",\"hum\":";
          JSON_Data += h;
          JSON_Data += "}";
          
   Serial.println(JSON_Data);
   websockets.broadcastTXT(JSON_Data);  // envia datos a todos los clientes conectados
}*/
