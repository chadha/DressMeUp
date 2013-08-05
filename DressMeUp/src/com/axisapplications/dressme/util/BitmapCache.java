package com.axisapplications.dressme.util;

import android.graphics.Bitmap;
import android.support.v4.util.LruCache;

public class BitmapCache {

	private LruCache<String, Bitmap> cache;

	public BitmapCache() {
		// Get max available VM memory, exceeding this amount will throw an
		// OutOfMemory exception. Stored in kilobytes as LruCache takes an
		// int in its constructor.
		// Use 1/8th of the available memory for this memory cache.
		this((int) (Runtime.getRuntime().maxMemory() / 1024 / 8));
	}

	public BitmapCache(int cacheSize) {
		cache = new LruCache<String, Bitmap>(cacheSize) {
			@Override
			protected int sizeOf(String key, Bitmap bitmap) {
				// The cache size will be measured in kilobytes rather than
				// number of items.
				
				// there is no getByteCount() in API 8
				return bitmap.getRowBytes() * bitmap.getHeight() / 1024;
			}
		};
	}

	public void addBitmap(String key, Bitmap bitmap) {
		if (bitmap==null) return;
		if (getBitmap(key) == null) {
			cache.put(key, bitmap);
		}
	}

	public Bitmap getBitmap(String key) {
		return cache.get(key);
	}
}