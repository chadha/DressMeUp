package com.axisapplications.dressme.activity;

import com.axisapplications.dressme.R;
import com.axisapplications.dressme.activity.base.BaseActivity;
import com.axisapplications.dressme.domain.ItemObject;

import android.content.Intent;
import android.os.Bundle;
import android.view.SurfaceView;
import android.view.View;
import android.widget.Button;

public class CapturePhotoActivity extends BaseActivity {
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		overridePendingTransition(R.anim.fadein, R.anim.fadeout);
		
		setContentView(R.layout.activity3_capturephoto);
		
		// setup camera
		setupCameraPreviewOnSurfaceView((SurfaceView) findViewById(R.id.capturePhotoCameraPreviewSurfaceView), null, false);
		
		final Button takePhotoButton = (Button) findViewById(R.id.capturePhotoActivity_buttonTakePhoto);
		takePhotoButton.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				takePhoto(new RunnableAfterTakePhoto() {

					@Override
					public void execute(String pathToPhotoImage) {						
						//save photo file path to MessgeObject
						ItemObject.getCurrentItemObject().userItemPhoto = pathToPhotoImage;			
						
						Intent intent = new Intent(getApplicationContext(), ConfirmPhotoActivity.class);
						startActivity(intent);
					}
				});
			}
		});
		
		setupBackButton(R.id.capturePhotoActivity_buttonBack);		
	}
}