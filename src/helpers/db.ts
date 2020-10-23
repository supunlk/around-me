import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    name: 'districtData',
    createFromLocation: 2,
    location: "default"
  }, () => {
    console.log('success')
  },
  e => {
    console.log('Error - ' + e )
  })

export const init = (): Promise<any> => {
  return db.transaction(tx => {
    return tx.executeSql('CREATE TABLE IF NOT EXITS districtData (id TEXT PRIMARY KEY NOT NULL, latitude INTEGER NOT NULL, longitude INTEGER NOT NULL, weight INTEGER NOT NULL, cases INTEGER NOT NULL, district TEXT NOT NULL)')
  })
}

export const insertDistrict = (id: string, latitude: number, longitude: number, weight: number, cases: number, district: string) => {
  return db.transaction((tx) => {
    return tx.executeSql(
      'INSERT INTO districtData (id, latitude, longitude, weight, cases, district) VALUES (?, ?, ?, ?, ?, ?)',
      [id, latitude, longitude, weight, cases, district]
    )
  })

}

export const fetchDistricts = () => {
  return db.transaction((tx) => {
    return tx.executeSql(
      'SELECT * FROM districtData',
      []
    )
  })
}

export const fetchDistrict = (id: string) => {
  return db.transaction((tx) => {
    return tx.executeSql(
      'SELECT * FROM districtData WHERE id = ' + id,
      []
    )
  })
}
