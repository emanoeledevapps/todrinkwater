import { TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Card, Icon, Screen, Text } from "@components";
import { usePreferencesContext } from "@hooks";
import { MobileRoutesStackParamsList } from "@routes";

import { ChangeGlassSize } from "./components/ChangeGlassSize";
import { ChangeBottleSize } from "./components/ChangeBottleSize";
import { ChangeGoal } from "./components/ChangeGoal";

type ScreenProps = NativeStackScreenProps<MobileRoutesStackParamsList, "PreferencesScreen">
export function PreferencesScreen({ navigation }: ScreenProps) { 
  const { darkMode } = usePreferencesContext();

  function handleGoToIdealGoal() {
    navigation.navigate("IdealGoalScreen");
  }

  return (
    <Screen title="Preferências" scrollable showBackButton>
      <View className="px-5 pt-5 gap-5">
        <Card>
          <Text className="text-secondary-text-light dark:text-secondary-text-dark text-center">
            Aqui você pode personalizar sua experiência ajustando como deseja acompanhar sua hidratação diária. Defina sua meta de consumo de água, escolha o tamanho do copo que você costuma usar e configure o tamanho da garrafa para facilitar seus registros.
          </Text>
        </Card>

        <Card className="gap-2">
          <ChangeGoal />

          <TouchableOpacity
            className="w-full items-center justify-center flex-row gap-3 mt-3"
            onPress={handleGoToIdealGoal}
          >
            <Text className="text-primary-text-light dark:text-primary-text-dark">
              Calcule sua meta ideal
            </Text>
            <Icon name="chevronRight" color={darkMode ? "#E0F2FE" : "#1E3A8A"} />
          </TouchableOpacity>
        </Card>

        <Card className="gap-5">
          <ChangeGlassSize />
          <ChangeBottleSize />
        </Card>
      </View>
    </Screen>
  )
}
