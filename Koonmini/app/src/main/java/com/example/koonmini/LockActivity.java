package com.example.koonmini;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;


public class LockActivity extends AppCompatActivity {

    Button b2;

    String [] goOutData = {"", "휴가", "외출", "외박", "평일외출", "파견", "근무", "전투휴무", "기타"};
    Spinner spinner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lock);

        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        spinner = (Spinner)findViewById(R.id.spinner);

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, goOutData);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        spinner.setAdapter(adapter);

        b2=findViewById(R.id.button2);
        b2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                int index = spinner.getSelectedItemPosition();
                MainActivity.goOut=goOutData[index];

                final String urlStr = "http://koonmini.kro.kr/data";
                MainActivity.AsyncHttpConn(urlStr);
                /*new Thread(new Runnable() {
                    @Override
                    public void run() {
                        MainActivity.request(urlStr);
                    }
                }).start();*/

                MainActivity.locking = true;
                finish();


            }
        });
    }

    @Override
    public void onBackPressed() {

    }

    protected void onPause() {
        super.onPause();
        ActivityManager activityManager = (ActivityManager) getApplicationContext().getSystemService(Context.ACTIVITY_SERVICE);
        activityManager.moveTaskToFront(getTaskId(), 0);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}