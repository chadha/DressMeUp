package com.axisapplications.dressme.view;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.View;

public class CameraPreviewDecoratorView extends View {
	final private Paint paintOuter = new Paint();
	final private Paint paintInner = new Paint();
	final private RectF rectangle	= new RectF();

	public CameraPreviewDecoratorView(Context context, AttributeSet attrs) {
        super(context, attrs);
        
		paintInner.setStrokeWidth(5);
		paintInner.setStyle(Paint.Style.STROKE);
		paintInner.setColor(Color.WHITE);
		paintInner.setAntiAlias(true);

		paintOuter.setStrokeWidth(7);
		paintOuter.setStyle(Paint.Style.STROKE);
		paintOuter.setColor(Color.BLACK);
		paintOuter.setAntiAlias(true);

    }

	@Override
	public void onDraw(Canvas canvas) {
		final int size	= Math.min((int)((float)getWidth()/4f), (int)((float)getHeight()/4f));
		
		rectangle.set(
				(getWidth() - size)/2,
				(getHeight() - size)/2,
				(getWidth() + size)/2,
				(getHeight() + size)/2);
		
		//rectangle.set(20, 20, getWidth() - 20, getHeight() - 20);
		canvas.drawRoundRect(rectangle, 30f, 30f, paintOuter);
		canvas.drawRoundRect(rectangle, 30f, 30f, paintInner);
		canvas.drawCircle(getWidth()/2, getHeight()/2, 7, paintOuter);
		canvas.drawCircle(getWidth()/2, getHeight()/2, 7, paintInner);
	}
}