/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { View, AppState, Linking } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { watchEvents } from "react-native-wear-connectivity";

import { Screen, Text } from "@components";
import { dbService, useGetConsumptionDay } from "@db";
import { MobileRoutesStackParamsList } from "@routes";
import { connectivityService, MessageGetListDay, MessageListDayProps, MessageType } from "@connectivity";
import { usePreferencesContext } from "@hooks";

import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";

type ScreenProps = NativeStackScreenProps<MobileRoutesStackParamsList, "HomeScreen">
export function HomeScreen({ }: ScreenProps) {
  const { hasWatch, updateHasWatch } = usePreferencesContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appState, setAppState] = useState(AppState.currentState);
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });

  useEffect(() => {
    async function sendMessagesToWatch() {
      await connectivityService.sendListDay({origin: "smartphone", date: selectedDate });
    }
    if (hasWatch) {
      sendMessagesToWatch();
    }
  }, [selectedDate, appState, hasWatch]);
  
  useEffect(() => {
    const sub = AppState.addEventListener("change", nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        setSelectedDate(new Date());
      }
      setAppState(nextAppState);
    });
    
    if (hasWatch) {
      connectivityService.getListDay({ origin: "smartphone" });
    }
    return () => sub.remove();
  }, [appState, hasWatch]);

  useEffect(() => {
    const unsubscribe = watchEvents.on('message', (message) => {
      const messageType = message?.type as MessageType;

      if(messageType === "list-day") {
        const msg = message as MessageListDayProps
        if (msg.messageOrigin === "watch") {
          updateHasWatch(true);
          handleRegisterListDay(msg);
        }
      }

      if(messageType === "get-list-day") {
        const msg = message as MessageGetListDay;
        if (msg.messageOrigin === "watch") {
          updateHasWatch(true);
          connectivityService.sendListDay({
            origin: "smartphone",
            date: new Date()
          })
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

  function handleOpenPrivacyPolicy() {
    Linking.openURL("https://www.edevapps.com.br/terms/to-drink-water/privacy-policy");
  }

  return (
    <Screen hideHeader>
      <View className="flex-1">
        <View className="flex-1 items-center justify-center gap-10">
          <Consumption 
            total={totalConsumption}
          />

          <ListConsumption
            list={list}
            selectedDate={selectedDate}
            changeDate={setSelectedDate}
            consumptionAdded={refetch}
          />
        </View>
        <Text 
          className="text-center underline text-gray-500"
          onPress={handleOpenPrivacyPolicy}
        >
          Política de privacidade
        </Text>
      </View>
    </Screen>
  )
}