package com.axisapplications.dressme.activity;

import com.axisapplications.dressme.R;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageView;

public class ImageDialogActivity extends Activity {

	private ImageView imageDialogImageView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_imagedialog);

		imageDialogImageView = (ImageView) findViewById(R.id.imageDialogActivity_imageView);
		imageDialogImageView.setClickable(true);

		// finish the activity (dismiss the image dialog) if the user clicks
		// anywhere on the image
		imageDialogImageView.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				finish();
			}
		});

	}
}