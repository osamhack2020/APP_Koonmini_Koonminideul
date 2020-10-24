package com.example.koonmini;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    TextView textView;
    TextView textView2;

    public static String deviceId = null;
    public static Boolean locking = false;
    public static String goOut;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textView = findViewById(R.id.textView);
        textView2 = findViewById(R.id.textView2);


        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            deviceId = Settings.Secure.getString(getApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID);
        }
        else{
            //안드로이드 O 이하에서는 시리얼넘버나 IMEI를 받아온다.
        }
        textView.setText(deviceId);

        Button b1=findViewById(R.id.button);

        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                locking = true;

                Intent intent = new Intent(getApplicationContext(), LockActivity.class);
                startActivity(intent);
                Intent intent2 = new Intent(getApplicationContext(), LockService.class);
                startService(intent2);
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();

        textView2.setText(goOut);
    }
}