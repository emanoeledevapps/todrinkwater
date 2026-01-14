import { View } from "react-native";
import { Card, Screen, Text } from "@components";

import { Calculator } from "./components/Calculator";

export function IdealGoalScreen() {
  return (
    <Screen title="Meta ideal" showBackButton scrollable>
      <View className="px-5 pt-5 gap-5">
        <Card>
          <Text
            className="text-secondary-text-light dark:text-secondary-text-dark text-sm text-justify"
          >
            Manter-se hidratado é fundamental para a saúde e o bom funcionamento do corpo. A quantidade ideal de água que cada pessoa deve beber por dia varia conforme o peso e o nível de atividade física. Utilize esta calculadora para descobrir de forma prática e personalizada a quantidade recomendada de água para você consumir diariamente. Informe seu peso e tempo de exercícios que você realiza diariamente. Assim, fica mais fácil planejar sua hidratação e cuidar do seu bem-estar todos os dias.
          </Text>
        </Card>

        <Calculator />
      </View>
    </Screen>
  )
}