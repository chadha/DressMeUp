package com.axisapplications.dressme.receiver;

import com.axisapplications.dressme.activity.DisplayDescriptionActivity;
import com.axisapplications.dressme.domain.ItemObject;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

public class InstallReceiver extends BroadcastReceiver {

	public void onReceive(Context context, Intent intent) {
		Log.d("INSTALL RECEIVER", "Context: " + context);

		Bundle extras = intent.getExtras();
		if (extras != null) {
			Log.d("INSTALL RECEIVER", "Extras:");
			for (String keys : extras.keySet()) {
				Log.d("INSTALL RECEIVER", keys + " -> " + extras.get(keys));
			}
			
			//TODO do it in thread, more than 5sec kills application
			
			final String referrer = extras.getString("referrer");
			Log.i("REFERRER","Referer is: "+referrer);
			if (referrer!=null) {
				String[] referrerData	= referrer.split("|");
				if (referrerData.length==2) {
					ItemObject.getCurrentItemObject().retailerItemId	= referrerData[0];
					ItemObject.getCurrentItemObject().retailerLocationId	= referrerData[1];
					
					Intent intent2 = new Intent(context,
							DisplayDescriptionActivity.class);
					context.startActivity(intent2);
				}
			}
			
			
			
		} else {
			Log.i("INSTALL RECEIVER", "Extras are null");
		}
	}
}