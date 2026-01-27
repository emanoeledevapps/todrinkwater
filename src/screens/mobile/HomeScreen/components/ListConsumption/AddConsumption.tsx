import { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { format, isToday } from "date-fns";

import { dbService } from "@db";
import { Icon, Text } from "@components";
import { usePreferencesContext } from "@hooks";
import { connectivityService } from "@connectivity";

interface Props {
  selectedDate: Date;
  consumptionAdded: () => void
}
export function AddConsumption({ consumptionAdded, selectedDate }: Props) {
  const today = isToday(selectedDate);
  const { glassSize, bottleSize, unit, hasWatch } = usePreferencesContext();
  const [loadingGlass, setLoadingGlass] = useState(false);
  const [loadingBottle, setLoadingBottle] = useState(false);

  async function handleAddGlassConsumption() {
    setLoadingGlass(true);
    await dbService.addConsumption({
      formattedDate: format(new Date(), "dd/MM/yyyy"),
      quantity: glassSize,
      registerType: "glass",
      origin: "smartphone"
    });
    consumptionAdded();
    if (hasWatch) handleSendMessageToWatch();
    setLoadingGlass(false);
  }

  async function handleAddBottleConsumption() {
    setLoadingBottle(true);
    await dbService.addConsumption({
      formattedDate: format(new Date(), "dd/MM/yyyy"),
      quantity: bottleSize,
      registerType: "bottle",
      origin: "smartphone"
    });
    consumptionAdded();
    if (hasWatch) handleSendMessageToWatch();
    setLoadingBottle(false);
  }

  function handleSendMessageToWatch() {
    connectivityService.sendListDay({
      date: new Date(),
      origin: "smartphone"
    });
  }

  return (
    <View className="w-full flex-row gap-10 items-center justify-center">
      <TouchableOpacity
        className="w-40 h-14 rounded-full bg-accent-light items-center justify-center disabled:opacity-50"
        onPress={handleAddGlassConsumption}
        disabled={loadingGlass || !today}
      >
        {loadingGlass ? (
          <ActivityIndicator size={20} color="white" />
        ) : (
          <View className="flex-row items-center gap-2">
            <Icon name="glass" color="white" />
            <Text className="font-bold text-white">
              +{glassSize} {unit}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="w-40 h-14 rounded-full bg-accent-light items-center justify-center disabled:opacity-50"
        onPress={handleAddBottleConsumption}
        disabled={loadingBottle || !today}
      >
        {loadingBottle ? (
          <ActivityIndicator size={20} color="white" />
        ) : (
          <View className="flex-row items-center gap-2">
            <Icon name="bottle" color="white" size={25} />
            <Text className="font-bold text-white">
              +{bottleSize} {unit}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
