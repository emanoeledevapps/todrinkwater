import { View } from "react-native";
import { Screen, Text } from "@components";

import { ChangeGlassSize } from "./components/ChangeGlassSize";
import { ChangeBottleSize } from "./components/ChangeBottleSize";
import { ChangeGoal } from "./components/ChangeGoal";

export function PreferencesScreen() { 
  return (
    <Screen title="Preferências" scrollable showBackButton>
      <View className="px-5 pt-5 gap-5">
        <View className="p-5 w-full rounded-2xl bg-card-light dark:bg-card-dark">
          <Text className="text-secondary-text-light dark:text-secondary-text-dark text-center">
            Aqui você pode personalizar sua experiência ajustando como deseja acompanhar sua hidratação diária. Defina sua meta de consumo de água, escolha o tamanho do copo que você costuma usar e configure o tamanho da garrafa para facilitar seus registros.
          </Text>
        </View>

        <View className="p-5 w-full rounded-2xl gap-5 bg-card-light dark:bg-card-dark">
          <ChangeGoal />
        </View>

        <View className="p-5 w-full rounded-2xl gap-5 bg-card-light dark:bg-card-dark">
          <ChangeGlassSize />
          <ChangeBottleSize />
        </View>
      </View>
    </Screen>
  )
}
