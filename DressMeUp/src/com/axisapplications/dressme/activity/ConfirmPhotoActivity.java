package com.axisapplications.dressme.activity;

import java.util.Date;

import com.axisapplications.dressme.R;
import com.axisapplications.dressme.activity.base.BaseActivity;
import com.axisapplications.dressme.domain.ItemObject;
import com.j256.ormlite.dao.RuntimeExceptionDao;

import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

public class ConfirmPhotoActivity extends BaseActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		overridePendingTransition(R.anim.fadein, R.anim.fadeout);

		setContentView(R.layout.activity4_confirmphoto);

		setupBackButton(R.id.confirmPhotoActivity_buttonBack);

//		final TextView itemDescriptionViewText = (TextView) findViewById(R.id.confirmPhotoActivity_textItemRetailerDescription);
//		itemDescriptionViewText
//				.setText(ItemObject.getCurrentItemObject().retailerItemId
//		+ " from " + ItemObject.getCurrentItemObject().retailerLocation);

		final Button shareButton = (Button) findViewById(R.id.confirmPhotoActivity_buttonShare);
		shareButton.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {

				showEditDialog("Edit message", null, ItemObject.getCurrentItemObject().buildDefaultMessage(), new RunnableAfterText() {

					@Override
					public void execute(String text) {
						shareMessage(
								ItemObject.getCurrentItemObject().retailerItemId,
								text,
								ItemObject.getCurrentItemObject().userItemPhoto);
					}
				});
			}

		});

		final Button scanCodeButton = (Button) findViewById(R.id.confirmPhotoActivity_buttonScanCode);
		scanCodeButton.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				// clear message object
				ItemObject.getCurrentItemObject().clear();

				Intent intent = new Intent(getApplicationContext(),
						CaptureCodeActivity.class);
				intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
				startActivity(intent);
			}
		});

		final ImageView view = (ImageView) findViewById(R.id.confirmPhotoActivity_imageView);
		// get stored photo for display
		final String pathToImage = ItemObject.getCurrentItemObject().userItemPhoto;
		if (pathToImage != null) {
			Drawable image = Drawable.createFromPath(pathToImage);
			view.setImageDrawable(image);
		} else {
			view.setImageResource(R.drawable.img_empty);
		}
	}

	@Override
	protected void onStart() {
		super.onStart();

		// TODO move image from temp folder

		ItemObject.getCurrentItemObject().timestamp = new Date();
		// save current item object
		RuntimeExceptionDao<ItemObject, Integer> itemObjectDao = getHelper()
				.getItemObjectDao();
		if (ItemObject.getCurrentItemObject().id == ItemObject.ID_UNDEFINED) {
			if (itemObjectDao.create(ItemObject.getCurrentItemObject()) != 1) {
				showError("Could not save item");
			}
		} else {
			if (itemObjectDao.update(ItemObject.getCurrentItemObject()) != 1) {
				showError("Could not update item");
			}
		}

		// add photo to gallery
		addToGallery(ItemObject.getCurrentItemObject().userItemPhoto);
	}
}