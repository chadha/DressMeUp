package com.axisapplications.dressme.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

public class InstallReceiver extends BroadcastReceiver {

	public void onReceive(Context context, Intent intent) {
		Log.i("INSTALL RECEIVER", "Context: " + context);

		Bundle extras = intent.getExtras();
		if (extras != null) {
			Log.i("INSTALL RECEIVER", "Extras:");
			for (String keys : extras.keySet()) {
				Log.i("INSTALL RECEIVER", keys + " -> " + extras.get(keys));
			}
		} else {
			Log.i("INSTALL RECEIVER", "Extras are null");
		}
	}
}