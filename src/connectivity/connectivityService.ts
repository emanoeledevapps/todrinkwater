import { PermissionsAndroid, Platform } from "react-native";
import { sendMessage } from "react-native-wear-connectivity";
import { format } from "date-fns";

import { dbService } from "@db";

import { MessageGetListDay, MessageListDayProps, MessageOrigin } from "./types";

interface SendListDayProps {
  origin: MessageOrigin;
  date: Date;
}
async function sendListDay({ date, origin }: SendListDayProps): Promise<void> {
  if (Platform.OS === "ios") return;

  const permissions = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
  ]);
  if (permissions["android.permission.BLUETOOTH_CONNECT"] !== "granted") return;
  if (permissions["android.permission.BLUETOOTH_SCAN"] !== "granted") return;

  const list = await dbService.getConsumptionPerDay({ formattedDate: format(date, "dd/MM/yyyy") })
  const msg: MessageListDayProps = {
    list,
    messageOrigin: origin,
    type: "list-day"
  }

  try {
    sendMessage(
      msg,
      (reply) => { console.log(reply) },
      (error) => { console.log(error) }
    )
  } catch (e) {
    console.log(e);
  }
}

interface GetListDayProps {
  origin: MessageOrigin;
}
async function getListDay({ origin }: GetListDayProps): Promise<void> {
  if (Platform.OS === "ios") return;

  const permissions = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
  ]);
  if (permissions["android.permission.BLUETOOTH_CONNECT"] !== "granted") return
  if (permissions["android.permission.BLUETOOTH_SCAN"] !== "granted") return

  const msg: MessageGetListDay = {
    messageOrigin: origin,
    type: "get-list-day"
  }

  try {
    sendMessage(
      msg,
      (reply) => { console.log(reply) },
      (error) => { console.log(error) }
    )
  } catch (e) {
    console.log(e);
  }
}

export const connectivityService = {
  sendListDay,
  getListDay
}