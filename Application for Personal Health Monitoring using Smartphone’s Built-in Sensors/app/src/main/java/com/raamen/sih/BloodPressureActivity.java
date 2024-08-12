package com.raamen.sih;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.SurfaceTexture;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;
import android.view.Surface;
import android.view.TextureView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;

public class BloodPressureActivity extends AppCompatActivity {
    public ArrayList<Integer> array;

    private final int REQUEST_CODE_CAMERA = 0;
    public static final int MESSAGE_UPDATE_REALTIME = 1;
    public static final int MESSAGE_UPDATE_FINAL = 2;
    public static final int MESSAGE_CAMERA_NOT_AVAILABLE = 3;

    private static final int MENU_INDEX_NEW_MEASUREMENT = 0;
    private static final int MENU_INDEX_EXPORT_RESULT = 1;
    private static final int MENU_INDEX_EXPORT_DETAILS = 2;

    public enum VIEW_STATE {
        MEASUREMENT,
        SHOW_RESULTS
    }

    private boolean justShared = false;

    @SuppressLint("HandlerLeak")
    private final Handler mainHandler = new Handler(Looper.getMainLooper()) {
        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);

            if (msg.what ==  MESSAGE_UPDATE_REALTIME) {
                //((TextView) findViewById(R.id.textView)).setText(msg.obj.toString());
            }

            if (msg.what == MESSAGE_UPDATE_FINAL) {
                //((EditText) findViewById(R.id.editText)).setText(msg.obj.toString());

                // make sure menu items are enabled when it opens.
                //Menu appMenu = ((Toolbar) findViewById(R.id.toolbar)).getMenu();

                //setViewState(VIEW_STATE.SHOW_RESULTS);
            }

            if (msg.what == MESSAGE_CAMERA_NOT_AVAILABLE) {
                Log.println(Log.WARN, "camera", msg.obj.toString());

//                ((TextView) findViewById(R.id.textView)).setText(
//                        R.string.camera_not_found
//                );
                //analyzer.stop();
            }
        }
    };

    public boolean isPeak(double arr[], int n, double num, int i, int j)
    {
        if (i >= 0 && arr[i] >= num)
            return false;

        if (j < n && arr[j] >= num)
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

    public double getET(double arr[], int n, int peaks)
    {
        double[][] arr1 = new double[peaks][2];
        int j = 0;

        for (int i = 0; i < n; i++)
        {
            if (isPeak(arr, n, arr[i], i - 1, i + 1))
            {
                arr1[j++] = new double[]{arr[i], i*50};
            }
        }

        int mid1 = arr1.length/2;
        int mid2 = arr1.length/2 + 1;

        double et;
        if (arr1[mid1][0] > arr1[mid2][0]) {
             et = arr1[mid1][1] - arr1[mid1 - 1][1];
        } else {
            et = arr1[mid2][1] - arr1[mid1][1];
        }

        return et;
    }

    private final CameraService cameraService = new CameraService(this, mainHandler);

    @Override
    protected void onResume() {
        super.onResume();

        TextureView cameraTextureView = findViewById(R.id.textureView);
        SurfaceTexture previewSurfaceTexture = cameraTextureView.getSurfaceTexture();

        if ((previewSurfaceTexture != null) && !justShared) {
            Surface previewSurface = new Surface(previewSurfaceTexture);

            cameraService.start(previewSurface);
            measurePulse(cameraTextureView, cameraService);
        }
    }

    void measurePulse(TextureView textureView, CameraService cameraService) {

        // 20 times a second, get the amount of red on the picture.
        final int measurementInterval = 45;
        final int measurementLength = 15000;
        final int clipLength = 3500;
        final int[] ticksPassed = {0};

        CountDownTimer timer = new CountDownTimer(measurementLength, measurementInterval) {

            @Override
            public void onTick(long millisUntilFinished) {
                if (clipLength > (++ticksPassed[0] * measurementInterval)) return;

                Thread thread = new Thread(() -> {
                    Bitmap currentBitmap = textureView.getBitmap();
                    Bitmap newBitmap = Bitmap.createScaledBitmap(currentBitmap, 84, 84, false);
                    int pixelCount = newBitmap.getWidth() * newBitmap.getHeight();
                    int measurement = 0;
                    int[] pixels = new int[pixelCount];

                    newBitmap.getPixels(pixels, 0, newBitmap.getWidth(), 0, 0, newBitmap.getWidth(), newBitmap.getHeight());

                    for (int pixelIndex = 0; pixelIndex < pixelCount; pixelIndex++) {
                        measurement += (pixels[pixelIndex] >> 16) & 0xff;
                    }

                    array.add(measurement);

                });
                thread.start();
            }

            @Override
            public void onFinish() {
                Log.i("helloarr", array.toString());

                double[] arr = new double[array.size()];

                for (int i = 0; i < array.size(); i++) {
                    arr[i] = array.get(i);
                }

                int peaks = printPeaksTroughs(arr, arr.length);
                int hr = peaks*2;
                Log.i("hellopeak", Integer.toString(peaks*2));

                double et = getET(arr, arr.length, peaks);
                Log.i("helloet", Double.toString(et));

                int gender = 1;
                double W = 75;
                double H = 6;
                int age = 20;

                double bsa = 0.007184*Math.pow(W, 0.425)*Math.pow(H, 0.725);
                Log.i("hellobsa", Double.toString(bsa));
                double sv = -6.6 + 0.25*(et - 35) - 0.62*hr + 40.4*bsa - 0.51*age;
                Log.i("hellosv", Double.toString(sv));
                double pp = sv/((0.013*W - 0.007*age - 0.004*hr) + 1.307);
                Log.i("hellopp", Double.toString(pp));

                double sp = (93.33 + 1.5*pp);
                Log.i("hellosp", Double.toString(sp));
                double dp = (93.33 - pp/3);
                Log.i("hellodp", Double.toString(dp));

                if (cameraService != null)
                    cameraService.stop();

                Intent intent = new Intent(BloodPressureActivity.this, ResultActivity.class);
                intent.putExtra("name", "Blood Pressure");
                intent.putExtra("score", Integer.toString((int) sp) + "/" + Integer.toString((int) dp));
                intent.putExtra("normal", "90/60 - 120/80");
                startActivity(intent);
                finish();
            }
        };

        timer.start();
    }

    @Override
    protected void onPause() {
        super.onPause();
        cameraService.stop();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_heartbeat);

        array = new ArrayList<>();
    }
}