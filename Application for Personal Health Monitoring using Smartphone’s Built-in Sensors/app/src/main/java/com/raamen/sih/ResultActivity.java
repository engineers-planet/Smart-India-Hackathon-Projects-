package com.raamen.sih;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResultActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result);

        TextView name = findViewById(R.id.name);
        TextView score = findViewById(R.id.scoreText);
        TextView normal = findViewById(R.id.normal);

        Intent intent = getIntent();
        if (intent != null) {
            name.setText(intent.getStringExtra("name"));
            if (intent.getStringExtra("name").equals("Blood Pressure"))
                score.setText(intent.getStringExtra("score"));
            else
                score.setText(intent.getIntExtra("score", 0) != -1 ? Integer.toString(intent.getIntExtra("score", 0)): "Insufficient data");

            normal.setText("Normal range\n" + intent.getStringExtra("normal"));

            DatabaseReference database = FirebaseDatabase.getInstance("https://sih-raamen-default-rtdb.firebaseio.com/").getReference("username");
            HashMap<String, Object> map = new HashMap<>();

            map.put("date", System.currentTimeMillis());
            map.put("type", intent.getStringExtra("name"));
            map.put("score", intent.getIntExtra("score", 0));
            database.child(Long.toString(System.currentTimeMillis())).setValue(map);
        }
    }
}