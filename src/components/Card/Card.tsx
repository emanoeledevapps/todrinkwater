import { ReactNode } from "react";
import { View } from "react-native";

interface Props {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: Props) {
  return (
    <View className={`p-5 w-full rounded-2xl bg-card-light dark:bg-card-dark ${className}`}>
      {children}
    </View>
  )
}
