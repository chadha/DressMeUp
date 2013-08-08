package com.axisapplications.dressme.view;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.View;

public class QRCodeCameraPreviewDecoratorView extends View {
	final private Paint paintBlackAlpha = new Paint();
	final private Paint paintBlack = new Paint();
	final private Paint paintWhite = new Paint();
	
	final private RectF previewRectangle	= new RectF();
	final private RectF fullViewRectangle	= new RectF();
	
	public QRCodeCameraPreviewDecoratorView(Context context, AttributeSet attrs) {
        super(context, attrs);
        
        paintBlackAlpha.setStyle(Paint.Style.FILL);
        paintBlackAlpha.setColor(Color.argb(128, 0, 0, 0));

        paintBlack.setStrokeWidth(5);
        paintBlack.setStyle(Paint.Style.STROKE);
        paintBlack.setColor(Color.BLACK);

        paintWhite.setStrokeWidth(3);
        paintWhite.setStyle(Paint.Style.STROKE);
        paintWhite.setColor(Color.WHITE);
    }
	
	public RectF getPreviewRectangle() {
		return previewRectangle;
	}
	
	public RectF getFullViewRectangle() {
		return fullViewRectangle;
	}
	
	@Override
	public void onDraw(Canvas canvas) {
		final int size	= Math.min((int)((float)getWidth()/1.5f), (int)((float)getHeight()/1.5f));
		
		fullViewRectangle.set(
				0,
				0,
				getWidth(),
				getHeight());
		previewRectangle.set(
				(getWidth() - size)/2,
				(getHeight() - size)/2,
				(getWidth() + size)/2,
				(getHeight() + size)/2);
		
		canvas.drawRect(0, 0, getWidth(), previewRectangle.top, paintBlackAlpha);
		canvas.drawRect(0, previewRectangle.top, previewRectangle.left, previewRectangle.bottom, paintBlackAlpha);
		canvas.drawRect(previewRectangle.right, previewRectangle.top, getWidth(), previewRectangle.bottom, paintBlackAlpha);
		canvas.drawRect(0, previewRectangle.bottom, getWidth(), getHeight(), paintBlackAlpha);
		
		canvas.drawRect(previewRectangle, paintBlack);
		canvas.drawRect(previewRectangle, paintWhite);
	}
}