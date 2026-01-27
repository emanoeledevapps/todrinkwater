import { View } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Icon, Text } from "@components";
import { usePreferencesContext } from "@hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MobileRoutesStackParamsList } from "@routes";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = NativeStackNavigationProp<MobileRoutesStackParamsList, "HomeScreen">
interface Props {
  total: number;
}
export function Consumption({ total }: Props) {
  const navigation = useNavigation<NavigationProps>();
  const { goal, unit, darkMode } = usePreferencesContext();
  const percentDay = (total / goal) * 100;

  function handleGoToPreferenceScreen() {
    navigation.navigate("PreferencesScreen")
  }

  return (
    <View className="items-center w-full relative">
      <AnimatedCircularProgress
        size={250}
        width={15}
        fill={percentDay}
        tintColor="#2563EB"
        backgroundColor={darkMode ? "#272729" : "#aaa"}
        arcSweepAngle={180}
        rotation={270}
      >
        {
          () => (
            <View className="items-center mt-[-40]">
              <Text 
                className="font-bold text-primary-text-light dark:text-primary-text-dark text-3xl"
              >
                {Intl.NumberFormat("pt-BR").format(total)} {unit}
              </Text>
              <Text className="text-sm text-secondary-text-light dark:text-secondary-text-dark">
                Meta: {Intl.NumberFormat("pt-BR", { maximumFractionDigits: 3 }).format(goal)} {unit}
              </Text>
            </View>
          )
        }
      </AnimatedCircularProgress>

        <View className="absolute top-0 right-5">
          <Icon 
            name="settings" 
            size={25} 
            color={darkMode ? "#aaa" :  "black"} 
            onPress={handleGoToPreferenceScreen}
          />
        </View>
    </View>
  )
}
