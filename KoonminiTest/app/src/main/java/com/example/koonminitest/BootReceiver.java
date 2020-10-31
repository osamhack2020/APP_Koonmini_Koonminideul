package com.example.koonminitest;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

public class BootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED)){
            Intent i1 = new Intent(context,LockActivity.class);
            Intent i2 = new Intent(context,LockService.class);
            Intent i3 = new Intent(context,BootService.class);
            i1.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK|Intent.FLAG_ACTIVITY_SINGLE_TOP);
            i2.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            i3.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
                context.startForegroundService(i3);
                context.startActivity(i1);
                context.startForegroundService(i2);
            }
            else{
                context.startService(i3);
                context.startActivity(i1);
                context.startService(i2);
            }
        }
    }
}