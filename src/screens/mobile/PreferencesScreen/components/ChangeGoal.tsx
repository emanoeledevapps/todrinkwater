import { View } from "react-native";

import { Text } from "@components";
import { NumberSelector } from "./NumberSelector";
import { usePreferencesContext } from "@hooks";

export function ChangeGoal() {
  const { goal, changePreference } = usePreferencesContext();

  function handleChangeGoal(type: "minus" | "plus") {
    changePreference({
      type: "goal",
      value: type === "minus" ? goal - 50 : goal + 50
    })
  }

  return (
    <View className="items-center flex-row justify-between gap-1">
      <Text className="text-black dark:text-white">
        Meta diária
      </Text>

      <NumberSelector
        value={goal}
        handleMinus={() => handleChangeGoal("minus")}
        handlePlus={() => handleChangeGoal("plus")}
      />
    </View>
  )
}
