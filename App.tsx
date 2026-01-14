import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import BootSplash from "react-native-bootsplash";

import { database } from '@db';
import { PreferecesProvider } from '@contexts';
import { MobileRoutes, WatchRoutes } from '@routes';

import "./global.css";

function App() {
  const [isWatch, setIsWatch] = useState(false);

  useEffect(() => {
    checkDevice();
    initDB();
    requestBluetoothPermissions();
  }, []);

  async function initDB() {
    await database.openDB();
    await database.createTable();

    //exclude in future versions
    try {
      await database.backupToNewTable();
    } catch(e) {
      console.log(e)
    }
    BootSplash.hide({ fade: true });
  }

  async function checkDevice() {
    const response = await DeviceInfo.hasSystemFeature(
      'android.hardware.type.watch',
    );
    setIsWatch(response);
  }

  async function requestBluetoothPermissions() {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ]);

    console.log('Bluetooth permissions:', granted);
  }
}

  return (
    <SafeAreaProvider>
      <PreferecesProvider>
        {isWatch ? <WatchRoutes /> : <MobileRoutes /> }
      </PreferecesProvider>
    </SafeAreaProvider>
  );
}

export default App;
