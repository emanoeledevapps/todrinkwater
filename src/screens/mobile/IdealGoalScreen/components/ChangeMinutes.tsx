import { View } from "react-native";

import { Text } from "@components";

import { NumberSelector } from "./NumberSelector";

interface Props {
  value: number;
  changeValue: (value: number) => void;
}
export function ChangeMinutes({ changeValue, value }: Props) {
  return (
    <View className="items-center flex-row justify-between gap-1">
      <Text className="text-black dark:text-white max-w-[50%]">
        Minutos de atividade física
      </Text>

      <NumberSelector
        value={value}
        handleMinus={() => changeValue(value - 30)}
        handlePlus={() => changeValue(value + 30)}
        label="min"
      />
    </View>
  )
}
