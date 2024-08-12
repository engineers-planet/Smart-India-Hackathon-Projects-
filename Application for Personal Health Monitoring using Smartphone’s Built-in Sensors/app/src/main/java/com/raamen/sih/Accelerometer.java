package com.raamen.sih;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.util.Log;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Arrays;

public class Accelerometer extends AppCompatActivity implements SensorEventListener {
    SensorManager sensorManager;
    ArrayList<Float> xList = new ArrayList<>();
    ArrayList<Float> yList = new ArrayList<>();
    ArrayList<Float> zList = new ArrayList<>();
    boolean ready = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_accelerometer);
        sensorManager=(SensorManager) getSystemService(SENSOR_SERVICE);
        sensorManager.registerListener(this, sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER), SensorManager.SENSOR_DELAY_NORMAL);

        TextView timer = findViewById(R.id.timer);

        new CountDownTimer(30000, 800) {

            public void onTick(long millisUntilFinished) {
                timer.setText(Long.toString(millisUntilFinished/1000) + "s");
                ready = true;
                // logic to set the EditText could go here
            }

            public void onFinish() {
                timer.setText("0s");
                ready = false;
                Log.i("helloz", zList.toString());
                double[] arr = new double[zList.size()];

                for (int i = 0; i < zList.size(); i++) {
                    arr[i] = zList.get(i);
                }


                double arr2[] = ComputeMovingAverage(arr, arr.length, 3);

                //double arr3[] = ComputeMovingAverage(arr2, arr2.length, 3);
                int peaks = printPeaksTroughs(arr2, arr2.length);
                Log.i("hellopeaks", Integer.toString(peaks*2));

                double sum = 0;
                for (int i = 0; i < arr.length; i++) {
                    sum += arr[i];
                }

                double avg = (double) sum/arr.length;

                double sum2 = 0;
                for (int i = 0; i < arr.length; i++) {
                    sum2 += Math.pow(arr[i] - avg, 2);
                }

                double var = (double) sum2/(arr.length - 1);
                double sd = Math.sqrt(var);

                Log.i("hellosd", Arrays.toString(arr));
                Log.i("hellosd", Double.toString(sd));

                Intent intent = new Intent(Accelerometer.this, ResultActivity.class);
                intent.putExtra("name", "Respiratory Rate");
                intent.putExtra("score",  sd < 0.035 ? -1 : peaks*2);
                intent.putExtra("normal", "12 - 16");
                startActivity(intent);
                finish();
            }

        }.start();

    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        if (sensorEvent.sensor.getType()==Sensor.TYPE_ACCELEROMETER){
            if (ready) {
                ready = false;
//                xList.add(sensorEvent.values[0]);
//                yList.add(sensorEvent.values[1]);
                zList.add(sensorEvent.values[2]);

//                Log.i("hellox", xList.toString());
//                Log.i("helloy", yList.toString());
//                Log.i("helloz", zList.toString());
            }
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }

    public double[] ComputeMovingAverage(double arr[], int N, int K)
    {
        double[] arr_new = new double[N];
        int i;
        float sum = 0;
        for (i = 0; i < K; i++) {
            sum += arr[i];
            arr_new[i] = (sum / K);
        }
        for (i = K; i < N; i++) {
            sum -= arr[i - K];
            sum += arr[i];
            arr_new[i] = (sum / K);
        }
        return arr_new;
    }


    public boolean isPeak(double arr[], int n, double num, int i, int j)
    {
        if (i >= 0 && arr[i] > num)
            return false;

        if (j < n && arr[j] > num)
            return false;
        return true;
    }

    public int printPeaksTroughs(double arr[], int n)
    {
        int count=0;
        //System.out.print("Peaks : ");

        for (int i = 0; i < n; i++)
        {
            if (isPeak(arr, n, arr[i], i - 1, i + 1))
            {
                //System.out.println(arr[i]);
                count++;
            }
        }
        return count;
    }
}