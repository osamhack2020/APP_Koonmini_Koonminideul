#include <SoftwareSerial.h>

SoftwareSerial BTSerial(2,3);
byte buffer[1024];
int bufferPosition;


void setup() {
  // put your setup code here, to run once:
  BTSerial.begin(9600);
  Serial.begin(9600);
  bufferPosition = 0;
  pinMode(4, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  if(BTSerial.available()){
    //byte data = BTSerial.read();

    //Serial.write("안드로이드에서 수신한 값: ");
    Serial.write(BTSerial.read());

    
    //buffer[bufferPosition++];

    /*
    if(data == '\n'){
      buffer[bufferPosition]='\0';
      
      Serial.write(buffer, bufferPosition);
      bufferPosition=0;
    }
    */
  }
  if(Serial.available()){
      BTSerial.write(Serial.read());
    }
}
