import { View } from "react-native";
import { format } from "date-fns";

import { WaterConsumptionProps } from "@db";
import { Icon, Text } from "@components";
import { usePreferencesContext } from "@hooks";

interface Props {
  data: WaterConsumptionProps
}
export function ConsumptionItem({ data }: Props) {
  const { unit } = usePreferencesContext();

  return (
    <View className="flex-row items-center justify-between w-full border-b border-gray-800 py-3">
      <View className="flex-row items-center gap-1">
        <Icon 
          name={data.register_type === "bottle" ? "bottle" : "glass"} 
          size={data.register_type === "bottle" ? 20 : 16}
          color="#aaa" 
        />
        <Text className="text-primary-text-dark">
          +{data.quantity} {unit}
        </Text>

        {data.origin === "smartphone" && (
          <View className="flex-row items-center gap-2">
            <View className="w-1 h-1 rounded-full bg-[#aaa]" />
            <Icon name="mobile" color="#aaa" size={18} />
          </View>
        )}
      </View>
        <Text className="text-primary-text-dark">
          {format(new Date(data.created_at), "kk:mm")} 
        </Text>
    </View>
  )
}
