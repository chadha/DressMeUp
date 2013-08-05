package com.axisapplications.dressme.dao;

import com.axisapplications.dressme.domain.ItemObject;
import com.j256.ormlite.android.apptools.OrmLiteConfigUtil;

public class DatabaseConfigUtil extends OrmLiteConfigUtil {
	private static final Class<?>[] classes = new Class[] { ItemObject.class, };

	//TODO run after every domain update
	public static void main(String[] args) throws Exception {
		writeConfigFile("ormlite_config.txt", classes);
	}
}
