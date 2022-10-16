#define MSG_BUFFER_SIZE  (50)
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h> 
#include <Ticker.h>
#define TENSIOMETRO 34
#define DHTPIN 24
#define MOTOR 21
#define Led 2


#define DHTTYPE    DHT11
DHT dht(DHTPIN, DHTTYPE);


//void enviarDatosSensor();
void enviarDatosTension();
int limite;
int limite1;
int limite2;
int ten;
char msg[MSG_BUFFER_SIZE];
Ticker timer;
const char* ssid     = "RAMOS FIBRA";
const char* password = "KATHERINEZULEMA21";

const char* mqtt_server ="broker.emqx.io";


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

  if ((char)payload[0] == '1'){
    digitalWrite(Led, 1); 
    Serial.print("prendido ");
  }else{
    Serial.print("apagado ");
    digitalWrite(Led, 0);  
  }

}


void setup(void)
{
  
  Serial.begin(115200);
  pinMode(Led, OUTPUT);
  pinMode(MOTOR,OUTPUT);
  digitalWrite(MOTOR, HIGH);
  dht.begin();
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
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
    if (client.connect(clientId.c_str())) {
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
    ten= analogRead(TENSIOMETRO);
    if(limite1!=0 && limite2!=0){
      if(ten<limite1 && ten>limite2){
        digitalWrite(MOTOR,LOW);
      }else{
         digitalWrite(MOTOR,HIGH);
      }
    }
  
    snprintf (msg, MSG_BUFFER_SIZE,"{\"tension\":%ld}", ten);
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
