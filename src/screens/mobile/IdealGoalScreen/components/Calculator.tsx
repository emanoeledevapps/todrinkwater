/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import { Card, Text } from "@components";
import { usePreferencesContext } from "@hooks";

import { ChangeWeight } from "./ChangeWeight";
import { ChangeMinutes } from "./ChangeMinutes";

export function Calculator() {
  const navigation = useNavigation();
  const { unit, changePreference } = usePreferencesContext();
  const [weight, setWeight] = useState<number>(60);
  const [activityMinutes, setActivityMinutes] = useState<number>(0);
  const [idealGoal, setIdealGoal] = useState<number>(0);

  useEffect(() => {
    calculate();
  }, [weight, activityMinutes])

  function calculate() {
    const base = weight * 0.033 // 33 ml/kg
    const activity = (activityMinutes / 30) * 0.35 // 0,35 L/30 min
    setIdealGoal(Math.round((base + activity) * 1000))
  }

  function setGoal() {
    changePreference({ type: 'goal', value: idealGoal });
    Toast.show({
      type: 'success',
      text1: 'Meta definida com sucesso!'
    });
    navigation.goBack();
  }

  return (
    <Card className="gap-5">
      <Text className="text-secondary-text-light dark:text-secondary-text-dark text-sm">
        Calculadora
      </Text>
      <ChangeWeight value={weight} changeValue={setWeight} />
      <ChangeMinutes value={activityMinutes} changeValue={setActivityMinutes} />

      <View className="mt-5 items-center gap-2 w-full">
        <Text className="text-secondary-text-light dark:text-secondary-text-dark text-center">
          Sua meta ideal é
        </Text>
        <Text className="font-bold text-primary-text-light dark:text-primary-text-dark text-3xl">
          {Intl.NumberFormat('pt-BR').format(idealGoal)} {unit}
        </Text>

        <TouchableOpacity
          className="w-full h-12 rounded-full bg-accent-light items-center justify-center mt-3"
          onPress={setGoal}
        >
          <Text className="text-white font-semibold">Definir como meta</Text>
        </TouchableOpacity>
      </View>
    </Card>
  )
}