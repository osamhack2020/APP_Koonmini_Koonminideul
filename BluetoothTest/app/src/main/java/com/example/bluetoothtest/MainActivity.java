package com.example.bluetoothtest;

import androidx.appcompat.app.AppCompatActivity;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public class MainActivity extends AppCompatActivity {

    EditText sendText;
    Button sendBtn;
    TextView receivedData;

    Boolean connecting = false;

    static final int REQUEST_ENABLE_BT=10;
    BluetoothAdapter mBluetoothAdapter;
    int mPairedDeviceCount=0;
    Set<BluetoothDevice> pairedDevices;
    BluetoothDevice mRemoteDevice;
    BluetoothSocket mSocket = null;
    OutputStream mOutputStream = null;
    InputStream mInputStream = null;

    Thread mWorkerTread = null;

    byte[] readBuffer;
    int bufferPosition;


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case  REQUEST_ENABLE_BT:
                if (resultCode == RESULT_OK) {
                    selectPairedDevice();
                }
                else if (requestCode == RESULT_CANCELED) {
                    finish();
                }
                break;
        }
        super.onActivityResult(requestCode,resultCode,data);
    }

    void activateBluetooth() {
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if(mBluetoothAdapter==null){
            Toast.makeText(getApplicationContext(), "블루투스를 지원하지 않습니다!", Toast.LENGTH_SHORT);
            finish();
        }
        else {
            if (!mBluetoothAdapter.isEnabled()) {
                Intent enableBtIntent = new Intent((BluetoothAdapter.ACTION_REQUEST_ENABLE));
                startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
            }
            else {
                selectPairedDevice();
            }
        }
    }

    void selectPairedDevice() {
        pairedDevices = mBluetoothAdapter.getBondedDevices();
        mPairedDeviceCount = pairedDevices.size();

        if (mPairedDeviceCount == 0) {
            Toast.makeText(getApplicationContext(), "페어링된 장치가 없습니다!", Toast.LENGTH_SHORT);
            finish();
        }

        final List<String> listDevices = new ArrayList<String>();
        for (BluetoothDevice device : pairedDevices) {
            listDevices.add(device.getName());
        }

        ArrayAdapter mAdapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, listDevices);
        final ListView listView =findViewById(R.id.listview);
        listView.setAdapter(mAdapter);

        final String[] items = listDevices.toArray(new String[listDevices.size()]);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                if (connecting == false)
                    connectToBluetoothDevice(items[position]);

                connecting = true;
                findViewById(R.id.selectBT).setVisibility(View.INVISIBLE);
                findViewById(R.id.listview).setVisibility(View.INVISIBLE);
            }
        });
    }

    void connectToBluetoothDevice(String selectedDeviceName) {
        mRemoteDevice = getDeviceFromBondedList(selectedDeviceName);
        UUID uuid = UUID.fromString("00001101-0000-1000-8000-00805f9b34fb");

        try {
            mSocket = mRemoteDevice.createRfcommSocketToServiceRecord(uuid);
            mSocket.connect();

            mOutputStream = mSocket.getOutputStream();
            mInputStream = mSocket.getInputStream();

            receiveData();

        }
        catch (Exception e) {
            Toast.makeText(getApplicationContext(),"connect error",Toast.LENGTH_SHORT).show();
            finish();
        }
    }

    void receiveData() {
        final Handler handler = new Handler();

        readBuffer = new byte[1024];
        bufferPosition = 0;

        mWorkerTread = new Thread(new Runnable() {
            @Override
            public void run() {
                while (!Thread.currentThread().isInterrupted()) {

                    try {
                        int bytesAvailable = mInputStream.available();

                        if (bytesAvailable > 0) {
                            byte[] packetBytes = new byte[bytesAvailable];
                            mInputStream.read(packetBytes);

                            int i=0;
                            while(i < bytesAvailable) {

                                if (packetBytes[i]=='\n') {
                                    final String data = new String(readBuffer, "US-ASCII");
                                    bufferPosition = 0;

                                    handler.post(new Runnable() {
                                        @Override
                                        public void run() {
                                            receivedData.setText(data);
                                        }
                                    });
                                }
                                else {
                                    readBuffer[bufferPosition++] = packetBytes[i];
                                }

                                i +=1;
                            }
                        }
                    }
                    catch (Exception e) {
                        finish();
                    }
                }
            }
        });

        mWorkerTread.start();
    }

    void  transmitData(String msg) {
        msg += "\n";

        try {
            mOutputStream.write(msg.getBytes());
        }
        catch (Exception e) {
            finish();
        }
    }

    BluetoothDevice getDeviceFromBondedList(String name) {
        BluetoothDevice selectedDevice = null;

        for (BluetoothDevice device : pairedDevices) {
            if (name.equals(device.getName())) {
                selectedDevice = device;
                break;
            }
        }

        return selectedDevice;
    }

    protected void onDestroy() {
        try {
            mWorkerTread.interrupt();
            mInputStream.close();
            mOutputStream.close();
            mSocket.close();
        } catch (Exception e) {
        }

        super.onDestroy();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sendBtn = findViewById(R.id.b1);
        receivedData = findViewById(R.id.receivedData);
        sendText = findViewById(R.id.textforsend);


        sendBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                transmitData(String.valueOf(sendText.getText()));
            }
        });

        activateBluetooth();
    }
}