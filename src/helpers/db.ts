import SQLite, {ResultSet} from 'react-native-sqlite-storage';
import {DistrictData} from "../models/districtData";

const db = SQLite.openDatabase({
    name: 'districtData',
    createFromLocation: '~districtData.db',
    location: "default"
  }, () => {
    console.log('Open Database: Success')
  },
  e => {
    console.log('Open Database: Error - ' + e)
  })

export const initDb = (): Promise<any> => {

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS districts (id TEXT PRIMARY KEY NOT NULL, latitude INTEGER NOT NULL, longitude INTEGER NOT NULL, weight INTEGER NOT NULL, cases INTEGER NOT NULL, district TEXT NOT NULL)',
        [],
        () => resolve(),
        (error) => reject(error)
      )
    })
  });
}

export const insertDistrict = (id: string, latitude: number, longitude: number, weight: number, cases: number, district: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO districts (id, latitude, longitude, weight, cases, district) VALUES(?, ?, ?, ?, ?, ?)`,
        [id, latitude, longitude, weight, cases, district],
        () => resolve(),
        (err) => reject(err)
      )
    })
  });

}

export const fetchDistricts = ():Promise<DistrictData[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM districts',
        [],
        (trans, resultSet) => resolve(resultSet.rows.raw()),
        (err) => reject(err)
      )
    })
  })
}

export const fetchDistrict = (id: string): Promise<DistrictData> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM districts WHERE id = ?',
        [id],
        (trans, resultSet) => resolve(resultSet.rows.raw()[0]),
        (err) => reject(err)
      )
    })
  })

}
