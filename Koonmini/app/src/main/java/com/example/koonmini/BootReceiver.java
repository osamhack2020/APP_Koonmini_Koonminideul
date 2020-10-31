package com.example.koonmini;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.RequiresApi;

public class BootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getAction().equals("android.intent.action.BOOT_COMPLETED")){
            Intent i1 = new Intent(context,LockActivity.class);
            //Intent i2 = new Intent(context,LockService.class);

            i1.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(i1);
            //i2.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            //context.startService(i2);

            /*if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
                //context.startActivity(i1);
                context.startForegroundService(i2);
            }
            else{
                //context.startActivity(i1);
                context.startService(i2);
            }*/
        }
    }
}