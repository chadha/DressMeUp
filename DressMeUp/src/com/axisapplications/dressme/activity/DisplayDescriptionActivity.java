package com.axisapplications.dressme.activity;

import com.axisapplications.dressme.R;
import com.axisapplications.dressme.activity.base.BaseActivity;
import com.axisapplications.dressme.domain.ItemObject;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;

public class DisplayDescriptionActivity extends BaseActivity {

	@SuppressLint("SetJavaScriptEnabled")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		overridePendingTransition(R.anim.fadein, R.anim.fadeout);

		setContentView(R.layout.activity2_displaydescription);

		setupBackButton(R.id.displayDescriptionActivity_buttonBack);

//		final Button takePhotoButton = (Button) findViewById(R.id.displayDescriptionActivity_buttonTakePhoto);
//		takePhotoButton.setOnClickListener(new View.OnClickListener() {
//			public void onClick(View v) {
//				Intent intent = new Intent(getApplicationContext(),
//						CapturePhotoActivity.class);
//				startActivity(intent);
//			}
//		});

		final Button shareButton = (Button) findViewById(R.id.displayDescriptionActivity_buttonShare);
		shareButton.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				
					shareMessage(
							ItemObject.getCurrentItemObject().retailerItemId,
							ItemObject.getCurrentItemObject().buildDefaultMessage(),
							ItemObject.getCurrentItemObject().retailerItemLink,
							ItemObject.getCurrentItemObject().userItemPhoto);
			}
		});
		

		final Button couponButton = (Button) findViewById(R.id.displayDescriptionActivity_buttonCoupon);
		if (ItemObject.getCurrentItemObject().retailerCoupon != null) {
			couponButton.setVisibility(View.VISIBLE);

			couponButton.setOnClickListener(new View.OnClickListener() {

				@Override
				public void onClick(View arg0) {

					// show default coupon
					Intent intent = new Intent(getApplicationContext(),
							ImageDialogActivity.class);
					startActivity(intent);
				}

			});
			

			// TODO check expiration date
			playSound(R.raw.coupon_found);
			
			//first time show coupon by default
			couponButton.performClick();

		} else {
			couponButton.setVisibility(View.GONE);
		}

		// call is made to server to retrieve retailerItemLink,
		// retailerLocation, retailerCoupon, retailerCouponExpirationDate
		// (message can be received from page meta data) and retailerLocation
		// (can be received from local dictionary or server)
		ItemObject.getCurrentItemObject().retailerItemLink = "http://www.topshop.com/en/tsuk/product/shoes-430/view-all-748/stomp-ankle-platforms-2100367?bi=1&ps=20";
		ItemObject.getCurrentItemObject().retailerLocation = "Topshop Oxford Street, 36-38 Great Castle Street, Oxford Circus, West End, W1W 8LG";

		// open page
		final WebView webView = (WebView) findViewById(R.id.displayDescriptionActivity_webView);
		webView.getSettings().setJavaScriptEnabled(true);
		webView.getSettings().setSupportZoom(true);
		webView.getSettings().setBuiltInZoomControls(true);

		webView.getSettings().setDomStorageEnabled(true);

		// Set cache size to 8 mb by default. should be more than enough
		webView.getSettings().setAppCacheMaxSize(1024 * 1024 * 8);

		String appCachePath = getApplicationContext().getCacheDir()
				.getAbsolutePath();
		webView.getSettings().setAppCachePath(appCachePath);
		webView.getSettings().setAllowFileAccess(true);
		webView.getSettings().setAppCacheEnabled(true);

		webView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);

		webView.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				view.loadUrl(url);
				return true;
			}

			@Override
			public void onPageFinished(WebView view, String url) {
				// if (progressBar.isShowing()) {
				// progressBar.dismiss();
				// }
			}

			@Override
			public void onReceivedError(WebView view, int errorCode,
					String description, String failingUrl) {
				// alertDialog.setTitle("Error");
				// alertDialog.setMessage(description);
				// alertDialog.setButton("OK", new
				// DialogInterface.OnClickListener() {
				// public void onClick(DialogInterface dialog, int which) {
				// return;
				// }
				// });
				// alertDialog.show();
			}
		});
		try {
			webView.loadUrl("file:///android_asset/topshop_page/index.html");
			//webView.loadUrl(ItemObject.getCurrentItemObject().retailerItemLink);
		} catch (Exception e) {
			Toast.makeText(getApplication(),
					"Connection failed.\n" + e.getMessage(), Toast.LENGTH_LONG)
					.show();
		}
	}
}