package com.raamen.sih;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.hardware.Camera;
import android.os.Bundle;
import android.os.PowerManager;
import android.util.Log;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

public class MainActivity extends AppCompatActivity {

    private SurfaceView preview = null;
    private static SurfaceHolder previewHolder = null;
    private static Camera camera = null;
    private static PowerManager.WakeLock wakeLock = null;
    public boolean complete = false;

    private static long startTime = 0;
    private ProgressBar progress;
    public int ProgP = 0;
    public int inc = 0;
    public int counter = 0;

    public ArrayList<ArrayList<Double>> AvgList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        preview = findViewById(R.id.preview);
        previewHolder = preview.getHolder();
        previewHolder.addCallback(surfaceCallback);
        previewHolder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
        progress = findViewById(R.id.HRPB);
        progress.setProgress(0);

        PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
        wakeLock = pm.newWakeLock(PowerManager.FULL_WAKE_LOCK, ":DoNotDimScreen");
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

    @Override
    public void onResume() {
        super.onResume();
        wakeLock.acquire();
        camera = Camera.open();
        camera.setDisplayOrientation(90);
        startTime = System.currentTimeMillis();
    }

    @Override
    public void onPause() {
        super.onPause();
        wakeLock.release();
        camera.setPreviewCallback(null);
        camera.stopPreview();
        camera.release();
        camera = null;
    }

    private final Camera.PreviewCallback previewCallback = new Camera.PreviewCallback() {

        /**
         * {@inheritDoc}
         */
        @Override
        public void onPreviewFrame(byte[] data, Camera cam) {
            if (data == null) throw new NullPointerException();
            Camera.Size size = cam.getParameters().getPreviewSize();
            if (size == null) throw new NullPointerException();

            if (!complete) {

                int width = size.width;
                int height = size.height;

                double[] avg = ImageProcessing.decode(data.clone(), height, width);

                if (avg[0] < 200) {
                    Toast.makeText(MainActivity.this, "Retrying measurement", Toast.LENGTH_SHORT).show();
                } else {
                    ArrayList<Double> avgArr = new ArrayList<>();
                    avgArr.add(avg[0]);
                    avgArr.add(avg[1]);
                    avgArr.add(avg[2]);
                    avgArr.add(avg[3]);
                    avgArr.add(avg[4]);
                    avgArr.add(avg[5]);

                    AvgList.add(avgArr);
                }

                long endTime = System.currentTimeMillis();
                double totalTimeInSecs = (endTime - startTime) / 1000d;
                if (totalTimeInSecs >= 15) {
                    complete = true;
                    Log.i("helloavg", Integer.toString(AvgList.size()));

                    String url = "https://visara-api.herokuapp.com/";

                    try {
                        JSONArray arr = new JSONArray();

                        double sumr = 0, sumg = 0, sumb = 0, sdr = 0, sdg = 0, sdb = 0;
                        for (ArrayList<Double> d : AvgList) {
                            sumr += d.get(0);
                            sdr += d.get(1);
                            sumg += d.get(2);
                            sdg += d.get(3);
                            sumb += d.get(4);
                            sdb += d.get(5);
                        }

                        arr.put((double) sumr / AvgList.size());
                        arr.put((double) sdr / AvgList.size());
                        arr.put((double) sumg / AvgList.size());
                        arr.put((double) sdg / AvgList.size());
                        arr.put((double) sumb / AvgList.size());
                        arr.put((double) sdb / AvgList.size());

                        JSONObject jsonParams = new JSONObject();
                        jsonParams.put("images", arr);

                        JsonObjectRequest request = new JsonObjectRequest(
                                Request.Method.POST,
                                // Using a variable for the domain is great for testing
                                url,
                                jsonParams,
                                new Response.Listener<JSONObject>() {
                                    @Override
                                    public void onResponse(JSONObject response) {
                                        try {
                                            Intent intent = new Intent(MainActivity.this, ResultActivity.class);
                                            intent.putExtra("name", "Blood Oxygen");
                                            intent.putExtra("score", response.getDouble("spo2") < 70 || response.getDouble("spo2") > 120 ? -1 : (int) response.getDouble("spo2"));
                                            intent.putExtra("normal", "92 - 99");
                                            startActivity(intent);
                                            finish();
                                        } catch (JSONException e) {
                                            e.printStackTrace();
                                        }

                                    }
                                },

                                new Response.ErrorListener() {
                                    @Override
                                    public void onErrorResponse(VolleyError error) {
                                        Log.i("helloerror", error.getMessage());
                                        // Handle the error

                                    }
                                }) {
                            @Override
                            public Map<String, String> getHeaders() throws AuthFailureError {
                                Map<String, String> params = new HashMap<String, String>();
                                params.put("Content-Type", "application/json");
                                return params;
                            }
                        };

            /*

              For the sake of the example I've called newRequestQueue(getApplicationContext()) here
              but the recommended way is to create a singleton that will handle this.

              Read more at : https://developer.android.com/training/volley/requestqueue

              Category -> Use a singleton pattern

            */
                        Volley.newRequestQueue(getApplicationContext()).
                                add(request);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                ++counter;

                ProgP = inc++ / 16;
                progress.setProgress(ProgP);

            }
        }
    };

    private final SurfaceHolder.Callback surfaceCallback = new SurfaceHolder.Callback() {

        @Override
        public void surfaceCreated(SurfaceHolder holder) {
            try {
                camera.setPreviewDisplay(previewHolder);
                camera.setPreviewCallback(previewCallback);
            } catch (Throwable t) {
                Log.e("PreviewDemo-surfaceCallback", "Exception in setPreviewDisplay()", t);
            }
        }

        @Override
        public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

            Camera.Parameters parameters = camera.getParameters();
            parameters.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);

            Camera.Size size = getSmallestPreviewSize(width, height, parameters);
//            if (size != null) {
//                parameters.setPreviewSize(size.width, size.height);
//                Log.d(TAG, "Using width=" + size.width + " height=" + size.height);
//            }

            camera.setParameters(parameters);
            camera.startPreview();
        }


        @Override
        public void surfaceDestroyed(SurfaceHolder holder) {
        }
    };

    private static Camera.Size getSmallestPreviewSize(int width, int height, Camera.Parameters parameters) {
        Camera.Size result = null;
        for (Camera.Size size : parameters.getSupportedPreviewSizes()) {
            if (size.width <= width && size.height <= height) {
                if (result == null) {
                    result = size;
                } else {
                    int resultArea = result.width * result.height;
                    int newArea = size.width * size.height;
                    if (newArea < resultArea) result = size;
                }
            }
        }
        return result;
    }
}