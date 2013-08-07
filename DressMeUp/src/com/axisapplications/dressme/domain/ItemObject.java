package com.axisapplications.dressme.domain;

import java.util.Date;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "items")
public class ItemObject {

	final static public int ID_UNDEFINED	= -1; 
	
	// FIXME this is terrible hack, message object shall be passed in every
	// Intent
	private static ItemObject currentItemObject = new ItemObject();
	public static ItemObject getCurrentItemObject() {
		return currentItemObject;
	}
	
	public static void setCurrentItem(ItemObject itemObject) {
		currentItemObject = itemObject;
	}

	public void clear() {
		currentItemObject = new ItemObject();
	}
	
	public ItemObject() {
		// needed by ormlite
	}

	@DatabaseField(columnName="id", generatedId = true)
	public int id	= ID_UNDEFINED;

	@DatabaseField(columnName="user_item_photo")
	public String userItemPhoto;

	@DatabaseField(columnName="retailer_location_id")
	public String retailerLocationId;
	
	@DatabaseField(columnName="retailer_location")
	public String retailerLocation;

	@DatabaseField(columnName="retailer_item_id")
	public String retailerItemId;

	@DatabaseField(columnName="retailer_item_link")
	public String retailerItemLink;

	@DatabaseField(columnName="retailer_coupon")
	public String retailerCoupon;
	
	@DatabaseField(columnName="retailer_coupon_expiration_date")
	public Date retailerCouponExpirationDate;

	@DatabaseField(columnName="timestamp", index=true)
	public Date timestamp;
	
	public String buildDefaultMessage() {
		return retailerItemId + " from " + retailerLocation + ".";
	}
}