package com.axisapplications.dressme.receiver;

import java.util.concurrent.atomic.AtomicReference;

import com.axisapplications.dressme.activity.DisplayDescriptionActivity;
import com.axisapplications.dressme.domain.ItemObject;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

public class InstallReceiver extends BroadcastReceiver {
	
	//atomic access
	private static AtomicReference<String> atomicReferrer	= new AtomicReference<String>();
	
	public static String getReferrer() {
		return atomicReferrer.get();
	}

	public void onReceive(Context context, Intent intent) {
		Log.d("INSTALL RECEIVER", "Context: " + context);

		Bundle extras = intent.getExtras();
		if (extras != null) {
			Log.d("INSTALL RECEIVER", "Extras:");
			for (String keys : extras.keySet()) {
				Log.d("INSTALL RECEIVER", keys + " -> " + extras.get(keys));
			}
			
			final String referrer = extras.getString("referrer");
			Log.i("REFERRER","Referer is: "+referrer);
			
			atomicReferrer.set(referrer);
		} else {
			Log.i("INSTALL RECEIVER", "Extras are null");
		}
	}
}