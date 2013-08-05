package com.axisapplications.dressme.view;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.ImageView;

public class FitYAspectRatioImageView extends ImageView {
	
	public FitYAspectRatioImageView(Context context) {
		super(context);
	}

	public FitYAspectRatioImageView(Context context, AttributeSet attrs) {
		super(context, attrs);
	}

	public FitYAspectRatioImageView(Context context, AttributeSet attrs,
			int defStyle) {
		super(context, attrs, defStyle);
	}

	@Override
	protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
		
//		int widthFitX = MeasureSpec.getSize(widthMeasureSpec);
//		int heightFitX = widthFitX * getDrawable().getIntrinsicHeight()
//					/ getDrawable().getIntrinsicWidth();
		
		int heightFitY = MeasureSpec.getSize(heightMeasureSpec);
		int widthFitY = heightFitY * getDrawable().getIntrinsicWidth()
					/ getDrawable().getIntrinsicHeight();
		
		//setMeasuredDimension(widthFitX, heightFitX);
		
		setMeasuredDimension(widthFitY, heightFitY);
	}
}