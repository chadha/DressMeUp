package com.axisapplications.dressme.share;

import java.util.List;

import com.axisapplications.dressme.R;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

//import com.facebook.android.Facebook;

public class ShareHelper {
	Context context;
	String subject;
	String message;
	String imageFilePath;

	public ShareHelper(Context context, String subject, String message,
			String imageFilePath) {
		this.context = context;
		this.subject = subject;
		this.message = message;
		this.imageFilePath = imageFilePath;
	}

	protected void shareImage(String imageFilePath) {
		Intent share = new Intent(Intent.ACTION_SEND);
		share.setType("image/*");
		share.putExtra(Intent.EXTRA_STREAM, Uri.parse(imageFilePath));
		context.startActivity(Intent.createChooser(share, "Share via"));
	}

	public boolean share() {
		// // TODO write custom intent working with Whatsapp, Facebook, Gmail,
		// // EMail, Twitter, Blogger, Instagram, etc.
		// Intent share = new Intent(Intent.ACTION_SEND);
		// share.setType("text/plain");
		// share.putExtra(Intent.EXTRA_SUBJECT, subject);
		// share.putExtra(Intent.EXTRA_TEXT, message);
		// startActivity(Intent.createChooser(share, "Share via"));

		Intent sendIntent = new Intent(android.content.Intent.ACTION_SEND);

		if (this.imageFilePath == null) {
			sendIntent.setType("text/plain");
		} else {
			sendIntent.setType("image/*");
		}

		List<ResolveInfo> activities = context.getPackageManager()
				.queryIntentActivities(sendIntent, 0);

		AlertDialog.Builder builder = new AlertDialog.Builder(context);
		builder.setTitle("Share via");

		final ShareIntentListAdapter adapter = new ShareIntentListAdapter(
				(Activity) context, R.layout.layout_sharelistview,
				activities.toArray());

		builder.setAdapter(adapter, new DialogInterface.OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which) {
				ResolveInfo info = (ResolveInfo) adapter.getItem(which);

				Log.i("ShareHelper", "Selected share action package ["
						+ info.activityInfo.packageName + "]");

				if (info.activityInfo.packageName.contains("facebook")) {
					// custom facebook action
					// new PostToFacebookDialog(context, body).show();
					Toast.makeText(context, "Facebook not implemented.",
							Toast.LENGTH_SHORT).show();
				} else if (info.activityInfo.packageName
						.contains("com.whatsapp")) {
					// send two messages
					if (imageFilePath != null) {
						// first with image
						Intent intent1 = new Intent(Intent.ACTION_SEND);
						intent1.setClassName(info.activityInfo.packageName,
								info.activityInfo.name);
						intent1.setType("image/*");
						intent1.putExtra(Intent.EXTRA_STREAM,
								Uri.parse(imageFilePath));
						context.startActivity(intent1);
					}

					// then text
					Intent intent2 = new Intent(Intent.ACTION_SEND);
					intent2.setClassName(info.activityInfo.packageName,
							info.activityInfo.name);
					intent2.setType("text/plain");
					intent2.putExtra(Intent.EXTRA_SUBJECT, subject);
					intent2.putExtra(Intent.EXTRA_TEXT, message);
					context.startActivity(intent2);

				} else {
					Intent intent = new Intent(Intent.ACTION_SEND);
					intent.setClassName(info.activityInfo.packageName,
							info.activityInfo.name);
					intent.setType("text/plain");
					intent.putExtra(Intent.EXTRA_SUBJECT, subject);
					intent.putExtra(Intent.EXTRA_TEXT, message);
					if (imageFilePath != null) {
						intent.putExtra(Intent.EXTRA_STREAM,
								Uri.parse(imageFilePath));
					}
					context.startActivity(intent);
				}
			}
		});
		builder.create().show();
		return true;
	}
}