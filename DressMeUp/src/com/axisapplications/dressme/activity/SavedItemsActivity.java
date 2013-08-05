package com.axisapplications.dressme.activity;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import com.axisapplications.dressme.R;
import com.axisapplications.dressme.activity.base.BaseActivity;
import com.axisapplications.dressme.domain.ItemObject;
import com.axisapplications.dressme.util.BitmapCache;
import com.j256.ormlite.dao.RuntimeExceptionDao;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

public class SavedItemsActivity extends BaseActivity {

	private ItemsListViewAdapter itemsListViewAdapter;
	private ListView itemslistView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		overridePendingTransition(R.anim.fadein, R.anim.fadeout);

		setContentView(R.layout.activity_saveditems);

		setupBackButton(R.id.savedItemsActivity_buttonBack);

		itemsListViewAdapter = new ItemsListViewAdapter(this);

		itemslistView = (ListView) findViewById(R.id.savedItems_listViewItems);
		itemslistView.setAdapter(itemsListViewAdapter);

		itemslistView.setOnItemClickListener(itemsListViewAdapter);

		refreshItemsList();
	}

	@Override
	protected void onResume() {
		super.onResume();
		refreshItemsList();
	}

	private void refreshItemsList() {
		// reload items from db
		RuntimeExceptionDao<ItemObject, Integer> itemObjectDao = getHelper().getItemObjectDao();
		List<ItemObject> itemObjects = itemObjectDao.queryForAll();

		itemsListViewAdapter.setItemsList(itemObjects);

		// do we need to call this?
		itemslistView.invalidate();
	}

	private static class ItemsListViewAdapter extends BaseAdapter implements AdapterView.OnItemClickListener {
		private LayoutInflater inflater;
		private List<ItemObject> itemObjects;

		private BaseActivity context;

		private SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
				"yyyy-MM-dd\nHH:mm", Locale.US);

		private BitmapCache bitmapCache = new BitmapCache();

		public ItemsListViewAdapter(BaseActivity context) {
			this.context = context;
			inflater = LayoutInflater.from(context);
			itemObjects = new ArrayList<ItemObject>();
		}

		public void setItemsList(List<ItemObject> itemObjects) {
			this.itemObjects = itemObjects;
		}
		
		@Override
		public void onItemClick(AdapterView<?> parent, final View view, int position, long id) {

			final ItemObject itemObject = itemObjects.get(position);
			ItemObject.setCurrentItem(itemObject);

			Intent intent = new Intent(context.getApplicationContext(), DisplayDescriptionActivity.class);
			context.startActivity(intent);
			
		}

		@Override
		public int getCount() {
			return itemObjects.size();
		}

		@Override
		public Object getItem(int position) {
			return position;
		}

		@Override
		public long getItemId(int position) {
			return position;
		}

		@Override
		public View getView(int position, View convertView, ViewGroup parent) {
			ViewHolder holder;
			if (convertView == null) {
				convertView = inflater.inflate(R.layout.layout_saveditemslistview,
						null);
				holder = new ViewHolder();

				holder.item_photo = (ImageView) convertView
						.findViewById(R.id.item_photo);
				holder.item_name = (TextView) convertView
						.findViewById(R.id.item_name);
				holder.item_timestamp = (TextView) convertView
						.findViewById(R.id.item_timestamp);

				convertView.setTag(holder);
			} else {
				holder = (ViewHolder) convertView.getTag();
			}

			final ItemObject itemObject = itemObjects.get(position);

			Bitmap itemPhotoBitmap = null;
			if (itemObject.userItemPhoto != null) {
				itemPhotoBitmap = bitmapCache
						.getBitmap(itemObject.userItemPhoto);

				if (itemPhotoBitmap == null) {
					File userItemPhotoFile = new File(itemObject.userItemPhoto);
					if (userItemPhotoFile.exists()) {

						// decode thumbnail 60dp

						// TODO check if width are dp or pixels
						try {
							itemPhotoBitmap = context
									.decodeThumbnailBitmap(userItemPhotoFile
											.getAbsolutePath(), context
											.dpToPx(holder.item_photo
													.getWidth()), context
											.dpToPx(holder.item_photo
													.getHeight()));
						} catch (IOException e) {
							e.printStackTrace();
							context.showError("Could not decode bitmap", e);
						}
						bitmapCache.addBitmap(itemObject.userItemPhoto,
								itemPhotoBitmap);
					}
				}
			}

			if (itemPhotoBitmap != null) {
				holder.item_photo.setImageBitmap(itemPhotoBitmap);
			} else {
				holder.item_photo.setImageResource(R.drawable.img_empty);
			}

			if (itemObject.retailerItemId != null) {
				holder.item_name.setText(itemObject.retailerItemId);
			} else {
				holder.item_name.setText("N/A");
			}

			if (itemObject.timestamp != null) {
				holder.item_timestamp.setText(simpleDateFormat
						.format(itemObject.timestamp));
			} else {
				holder.item_timestamp.setText("N/A");
			}

			return convertView;
		}

		static class ViewHolder {
			ImageView item_photo;
			TextView item_name;
			TextView item_timestamp;
		}
	}
}