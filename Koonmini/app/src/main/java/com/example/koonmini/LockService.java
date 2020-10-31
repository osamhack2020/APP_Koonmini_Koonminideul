package com.example.koonmini;

import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.IBinder;

import androidx.core.app.NotificationCompat;

public class LockService extends Service {

    public LockService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void onCreate() {
        super.onCreate();
        if(Build.VERSION.SDK_INT >= 26) {
            Notification notification = new NotificationCompat.Builder(this, ALARM_SERVICE).setContentTitle("군미니").setContentText("잠금화면실행").build();
            startForeground(7, notification);
        }
        Intent intent = new Intent(getApplicationContext(), LockActivity.class);
        //intent.addFlags()
        startActivity(intent);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}