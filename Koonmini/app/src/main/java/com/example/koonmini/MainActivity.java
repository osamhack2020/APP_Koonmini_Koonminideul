package com.example.koonmini;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import com.loopj.android.http.*;

import cz.msebera.android.httpclient.Header;


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

        /*TelephonyManager mTelephony = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
        if (mTelephony.getDeviceId() != null){
            deviceId = mTelephony.getDeviceId();
        } else {
            deviceId = Settings.Secure.getString(getApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID);
        }*/

        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
            deviceId = Settings.Secure.getString(getApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID);
        }
        else{
            //안드로이드 O 아래 버전에서는 S/N 이나 IMEI를 받아온다.
        }
        textView.setText(deviceId);

        Button b1=findViewById(R.id.button);

        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                final String urlStr = "http://koonmini.kro.kr:3000/";
                AsyncHttpConn(urlStr);
                /*new Thread(new Runnable() {
                    @Override
                    public void run() {
                        request(urlStr);
                    }
                }).start();*/

                locking = true;
                Intent intent = new Intent(getApplicationContext(), LockActivity.class);
                startActivity(intent);

            }
        });
    }

    static public void request(String urlStr) {
        OutputStream os = null;
        String s_data = "{\"deviceId\":"+"\""+deviceId+"\""+",\"locking\":"+"\""+locking+"\""+",\"goOut\":"+"\""+goOut+"\"}";

        try {
            URL url = new URL(urlStr);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            if(conn != null){
                conn.setConnectTimeout(5000);
                conn.setReadTimeout(5000);
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Cache-Control","no-cache");
                conn.setRequestProperty("Content-Type","application/json");
                conn.setRequestProperty("Accept","application/json");
                conn.setDoOutput(true);
                conn.setDoInput(true);

                os = conn.getOutputStream();
                os.write(s_data.getBytes());
                os.flush();

                int responseCode = conn.getResponseCode();

                conn.disconnect();
            }

        } catch (Exception ex) {
            Log.d("server connecting", ex.toString());
        }

    }

    static public void AsyncHttpConn(String urlStr){

        RequestParams params = new RequestParams();
        params.put("deviceId", deviceId);
        params.put("locking", locking);
        params.put("goOut", goOut);

        AsyncHttpClient client = new AsyncHttpClient();
        client.post(urlStr, params, new JsonHttpResponseHandler() {
            @Override
            public  void onStart() {

            }
            @Override
            public void onSuccess(int statusCode, Header[] headers, String responseString) {

            }
            @Override
            public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {

            }
            @Override
            public void onRetry(int retryNO){

            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
            textView2.setText(goOut);
    }
}