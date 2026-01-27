/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { watchEvents } from "react-native-wear-connectivity";

import { connectivityService, MessageGetListDay, MessageListDayProps, MessagePreferences, MessageType } from "@connectivity";
import { dbService, useGetConsumptionDay } from "@db";
import { Screen } from "@components";
import { WatchRoutesStackParamsList } from "@routes";
import { usePreferencesContext } from "@hooks";

import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";

type ScreenProps = NativeStackScreenProps<WatchRoutesStackParamsList, "HomeWatchScreen">
export function HomeWatchScreen({ }: ScreenProps) {
  const { updateWatchPreferences } = usePreferencesContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    async function sendMessagesToSmartphone() {
      await connectivityService.sendListDay({origin: "watch", date: selectedDate });
    }
    sendMessagesToSmartphone();
  }, [selectedDate, appState]);
  
  useEffect(() => {
    const sub = AppState.addEventListener("change", nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        setSelectedDate(new Date());
      }
      setAppState(nextAppState);
    });
    
    connectivityService.getListDay({ origin: "watch" });
    return () => sub.remove();
  }, [appState]);

  useEffect(() => {
    const unsubscribe = watchEvents.on('message', (message) => {
      const messageType = message?.type as MessageType;

      if(messageType === "list-day") {
        const msg = message as MessageListDayProps;
        if (msg.messageOrigin === "smartphone") {
          handleRegisterListDay(msg);
        }
      }

      if(messageType === "get-list-day") {
        const msg = message as MessageGetListDay;
        if (msg.messageOrigin === "smartphone") {
          connectivityService.sendListDay({
            origin: "watch",
            date: new Date()
          })
        }
      }

      if(messageType === "preferences") {
        const msg = message as MessagePreferences;
        if (msg.messageOrigin === 'smartphone') {
          updateWatchPreferences(msg.preferences)
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  async function handleRegisterListDay(msg: MessageListDayProps) {
    const listItems = msg.list
    for (let i = 0; i < listItems.length; i++) {
      const item = listItems[i];
      try {
        await dbService.addConsumptionFromConnectivity({
          created_at: item.created_at,
          formatted_date: item.formatted_date,
          id: item.id,
          origin: item.origin,
          quantity: item.quantity,
          register_type: item.register_type,
          excluded: item.excluded
        })
      } catch (e) {
        console.log(e)
      }
    }
    refetch();
  }

  return (
    <Screen watch>
      <Consumption total={totalConsumption} consumptionAdded={refetch} />
      <ListConsumption list={list} />
    </Screen>
  )
}
