package com.raamen.sih;

import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.util.Log;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class TimerActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_accelerometer);

        String type = "";
        Intent intent = getIntent();
        if (intent != null)
            type = intent.getStringExtra("name");

        TextView timer = findViewById(R.id.timer);

        String finalType = type;
        new CountDownTimer(5100, 1000) {

            public void onTick(long millisUntilFinished) {
                timer.setText(Long.toString(millisUntilFinished/1000));
            }

            public void onFinish() {
                timer.setText("0");
                Intent intent;
                switch (finalType) {
                    case "spo2":
                      intent = new Intent(TimerActivity.this, MainActivity.class);
                      break;
                    case "bp":
                        intent = new Intent(TimerActivity.this, BloodPressureActivity.class);
                        break;
                    case "hr":
                        intent = new Intent(TimerActivity.this, HeartBeatActivity.class);
                        break;
                    case "resp":
                        intent = new Intent(TimerActivity.this, Accelerometer.class);
                        break;
                    default:
                        intent = new Intent(TimerActivity.this, MainActivity.class);
                        break;
                }
                startActivity(intent);
                finish();
            }

        }.start();

    }
}