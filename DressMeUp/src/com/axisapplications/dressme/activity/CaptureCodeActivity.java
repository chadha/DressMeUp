package com.axisapplications.dressme.activity;

import java.net.URI;
import java.util.Date;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;
import android.content.Intent;
import android.graphics.Rect;
import android.graphics.RectF;
import android.hardware.Camera;
import android.hardware.Camera.PreviewCallback;
import android.hardware.Camera.Size;

import com.axisapplications.dressme.R;
import com.axisapplications.dressme.activity.base.BaseActivity;
import com.axisapplications.dressme.domain.ItemObject;
import com.axisapplications.dressme.receiver.InstallReceiver;
import com.axisapplications.dressme.view.QRCodeCameraPreviewDecoratorView;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.DecodeHintType;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.PlanarYUVLuminanceSource;
import com.google.zxing.ReaderException;
import com.google.zxing.Result;
import com.google.zxing.common.HybridBinarizer;

import android.view.SurfaceView;
import android.view.View;

public class CaptureCodeActivity extends BaseActivity {

	private MultiFormatReader multiFormatReader;
	private final AtomicBoolean scanning = new AtomicBoolean(true);

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		overridePendingTransition(R.anim.fadein, R.anim.fadeout);

		setContentView(R.layout.activity1_capturecode);

		//run referrer check every 500ms x 10 times
		
		
		
		new AsyncTask<Void, Void, Void>() {
			@Override
			protected Void doInBackground(Void... params) {
				Log.d("REFERRER", "Will wait 10 x 500ms for referrer");
				for (int i=0;i<10;i++) {
					try {
						Thread.sleep(500);
					} catch (InterruptedException e) {
						return null;
					}
					
					final String referrer	= InstallReceiver.getReferrer(); 
					if (referrer!=null) {
						Log.i("REFERRER", "Referrer received [" + referrer + "]");
						String[] referrerData	= referrer.trim().split("\\|");
						if (referrerData.length==2) {
							ItemObject.getCurrentItemObject().retailerItemId	= referrerData[0];
							ItemObject.getCurrentItemObject().retailerLocationId	= referrerData[1];
							
							Intent intent2 = new Intent(CaptureCodeActivity.this,
									DisplayDescriptionActivity.class);
							CaptureCodeActivity.this.startActivity(intent2);
						} else {
							Log.e("REFERRER", "Incorrect referrer [" + referrer + "]. Exit...");
						}
						
						return null;
					} else {
						Log.d("REFERRER", "No referrer. Will wait 500ms x " + (10-i) + " times");
					}
					
				}
				
				return null;
			}
		}.execute();
		
		
		
		Map<DecodeHintType, Object> hints = new EnumMap<DecodeHintType, Object>(
				DecodeHintType.class);
		multiFormatReader = new MultiFormatReader();
		multiFormatReader.setHints(hints);

		final QRCodeCameraPreviewDecoratorView qrCodeCameraPreviewDecoratorView = (QRCodeCameraPreviewDecoratorView) findViewById(R.id.captureCodeCameraPreview_decoratorView);

		PreviewCallback codeScanPreviewCallback = new PreviewCallback() {

			@Override
			public void onPreviewFrame(byte[] data, Camera camera) {
				if (!scanning.get())
					return;

				Camera.Parameters parameters = camera.getParameters();
				Size size = parameters.getPreviewSize();

				String result = decodeImage(data, size.width, size.height,
						qrCodeCameraPreviewDecoratorView.getPreviewRectangle(),
						qrCodeCameraPreviewDecoratorView.getFullViewRectangle());

				if (result != null) {
					if (isDebugEnabled()) {
						Toast.makeText(getApplication(),
								"DECODED [" + result + "]", Toast.LENGTH_LONG)
								.show();
					}

					Log.i(this.getClass().getSimpleName(), "Decoded [" + result
							+ "]");

					// TODO validate qrCode and split it

					// stop scanning
					scanning.set(false);

					playSound(R.raw.scan);
					//safe check
					ItemObject.getCurrentItemObject().clear();
					ItemObject.getCurrentItemObject().retailerItemId		= ""; 
					ItemObject.getCurrentItemObject().retailerLocationId	= "";

					try {
						List<NameValuePair> urlParameters = URLEncodedUtils.parse(new URI(result), "UTF-8");
						for (NameValuePair p : urlParameters) {
							final String parameterKey	= p.getName();
							final String parameterValue	= p.getValue();
							Log.d("QR CODE PARSE", "Decoded key=[" + parameterKey + "] value=[" + parameterValue + "]");
							
							if ("itmid".equalsIgnoreCase(parameterKey)) {
								ItemObject.getCurrentItemObject().retailerItemId	= parameterValue;
							} if ("locid".equalsIgnoreCase(parameterKey)) {
								ItemObject.getCurrentItemObject().retailerLocationId	= parameterValue;
							} if ("cpnid".equalsIgnoreCase(parameterKey)) {
								ItemObject.getCurrentItemObject().retailerCoupon	= parameterValue;
							}
						}

					} catch (Exception e) {
						showError("Could not parse code. Skip...");
					}
					
					//validate MessageObject 

					Intent intent = new Intent(getApplicationContext(),
							DisplayDescriptionActivity.class);
					startActivity(intent);

				}
			}
		};

		// setup camera
		setupCameraPreviewOnSurfaceView(
				(SurfaceView) findViewById(R.id.captureCodeCameraPreview_surfaceView),
				codeScanPreviewCallback, true);

		final Button debugNextButton = (Button) findViewById(R.id.captureCodeActivity_buttonDebugNext);
		debugNextButton.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				ItemObject.getCurrentItemObject().clear();
				ItemObject.getCurrentItemObject().retailerItemId = "TOPSHOP-32S05EBLK";
				ItemObject.getCurrentItemObject().retailerLocationId = "TOPSHOP-OXFCRC";

				Intent intent = new Intent(getApplicationContext(),
						DisplayDescriptionActivity.class);
				startActivity(intent);

			}
		});
		if (!isDebugEnabled()) {
			debugNextButton.setVisibility(View.GONE);
		}

		final Button debugNextWithCouponButton = (Button) findViewById(R.id.captureCodeActivity_buttonDebugNextWithCoupon);
		debugNextWithCouponButton
				.setOnClickListener(new View.OnClickListener() {
					public void onClick(View v) {
						ItemObject.getCurrentItemObject().clear();
						ItemObject.getCurrentItemObject().retailerItemId = "TOPSHOP-32S05EBLK";
						ItemObject.getCurrentItemObject().retailerLocationId = "TOPSHOP-OXFCRC";
						ItemObject.getCurrentItemObject().retailerCoupon = "20% Off";

						Intent intent = new Intent(getApplicationContext(),
								DisplayDescriptionActivity.class);
						startActivity(intent);

					}
				});
		if (!isDebugEnabled()) {
			debugNextWithCouponButton.setVisibility(View.GONE);
		}

		final Button savedItemsButton = (Button) findViewById(R.id.captureCodeActivity_buttonSavedItems);
		savedItemsButton.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				Intent intent = new Intent(getApplicationContext(),
						SavedItemsActivity.class);
				startActivity(intent);
			}
		});

		final Button findShopsButton = (Button) findViewById(R.id.captureCodeActivity_buttonFindShops);
		findShopsButton.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				Intent intent = new Intent(getApplicationContext(),
						FindShopsActivity.class);
				startActivity(intent);
			}
		});

		// TODO clean up temp folder upon start
	}

	private String decodeImage(byte[] data, int width, int height,
			RectF previewRect, RectF fullViewRect) {
		if (data.length == 0)
			return null;

		Result rawResult = null;
		// adjust previewRect to camera dimensions
		final Rect adjustedPreviewRect = new Rect();
		adjustedPreviewRect
				.set((int) (previewRect.left * ((float) width / fullViewRect
						.width())),
						(int) (previewRect.top * ((float) height / fullViewRect
								.height())),
						(int) (previewRect.right * ((float) width / fullViewRect
								.width())),
						(int) (previewRect.bottom * ((float) height / fullViewRect
								.height())));

		PlanarYUVLuminanceSource source = new PlanarYUVLuminanceSource(data,
				width, height, adjustedPreviewRect.left,
				adjustedPreviewRect.top, adjustedPreviewRect.width(),
				adjustedPreviewRect.height(), false);
		if (source != null) {
			BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
			try {
				rawResult = multiFormatReader.decodeWithState(bitmap);
			} catch (ReaderException re) {
				// continue
			} finally {
				multiFormatReader.reset();
			}
		}

		if (rawResult != null) {
			return rawResult.getText();
		} else {
			return null;
		}
	}

	@Override
	protected void onResume() {
		super.onResume();
		// restart scanner
		scanning.set(true);
	}
}