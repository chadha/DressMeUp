package com.axisapplications.dressme.activity;

import com.axisapplications.dressme.R;
import com.axisapplications.dressme.activity.base.BaseActivity;

import android.os.Bundle;

public class FindShopsActivity extends BaseActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		overridePendingTransition(R.anim.fadein, R.anim.fadeout);

		setContentView(R.layout.activity_findshops);

		setupBackButton(R.id.findShopsActivity_buttonBack);
	}
}