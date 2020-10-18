#include <SoftwareSerial.h>

SoftwareSerial BT(2,3);
byte r_data[128];
int p;


void setup() {
  BT.begin(9600);
  Serial.begin(9600);
  p=0;
  
}

void loop() {
  if(BT.available()){
    //"단말고유번호/반납 불출 여부(0 or 1)/출타여부 및 종류(0~n)" 이런 형식의 문자열 수신
    //ex) "1005f52d2b1a/1/0"
    byte data=BT.read();
    r_data[p++]=data;
    Serial.write(data);

    if(data=='\n'){
      r_data[p]='\0';

      
      Serial.write(r_data,p);
      p=0;

      //단말에 통신 성공 여부 송신 -> 화면을 잠그는데 사용
      BT.write('1');
    }
    
  }
  
}
