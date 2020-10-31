#include <SoftwareSerial.h>

SoftwareSerial BT(2,3);

void setup() {
  BT.begin(9600);
  Serial.begin(9600);
  
}

void loop() {
  if(BT.available()){
    //"단말고유번호/반납 불출 여부(0 or 1)/출타여부 및 종류(0~n)" 이런 형식의 문자열 수신
    //ex) "1005f52d2b1a/1/0"
    String r_str = BT.readStringUntil('\n');
    Serial.println(r_str);
    
    //단말에 통신 성공 여부 송신 -> 화면을 잠그는데 사용
    BT.write('1');
      
  }
 
}
