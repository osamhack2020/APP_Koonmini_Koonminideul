package com.example.koonminitest;

import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;

import androidx.core.app.NotificationCompat;

public class BootService extends Service {
    public BootService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    @Override
    public void onCreate() {
        super.onCreate();
        if(Build.VERSION.SDK_INT >= 26){
            Notification notification = new NotificationCompat.Builder(this, ALARM_SERVICE).setContentTitle("재부팅").setContentText("시스템 재부팅").build();
            startForeground(7, notification);
        }
    }
}