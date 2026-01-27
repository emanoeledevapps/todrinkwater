import { View } from "react-native";

import { Text } from "@components";

import { NumberSelector } from "./NumberSelector";

interface Props {
  value: number;
  changeValue: (value: number) => void;
}
export function ChangeWeight({ changeValue, value }: Props) {
  return (
    <View className="items-center flex-row justify-between gap-1">
      <Text className="text-black dark:text-white">
        Peso
      </Text>

      <NumberSelector
        value={value}
        handleMinus={() => changeValue(value - 1)}
        handlePlus={() => changeValue(value + 1)}
        label="kg"
      />
    </View>
  )
}
