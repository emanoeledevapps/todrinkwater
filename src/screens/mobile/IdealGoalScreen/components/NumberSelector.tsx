import { Icon, Text } from "@components";
import { TouchableOpacity, View } from "react-native";

interface Props {
  value: number;
  handleMinus: () => void;
  handlePlus: () => void;
  label?: string
}
export function NumberSelector({ handleMinus, handlePlus, value, label }: Props) {
  return (
    <View className="flex-row border border-gray-400 rounded-2xl overflow-hidden h-12">
      <TouchableOpacity
        onPress={handleMinus}
        className="w-10 h-full items-center justify-center disabled:opacity-50"
        disabled={value === 0}
      >
        <Icon name="minus" color="gray" />
      </TouchableOpacity>

      <View className="h-full flex-row w-[80px] border-l border-r border-gray-300 items-center justify-center gap-1">
        <Text preset="semibold" className="text-primary-text-light dark:text-primary-text-dark text-lg">
          {Intl.NumberFormat("pt-BR").format(value)}
        </Text>
        <Text className="text-primary-text-light dark:text-primary-text-dark">
          {label}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handlePlus}
        className="w-10 h-full items-center justify-center"
      >
        <Icon name="plus" color="gray" />
      </TouchableOpacity>
    </View>
  )
}
