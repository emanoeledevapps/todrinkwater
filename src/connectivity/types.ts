import { SavedPreferencesProps } from "@contexts";
import { WaterConsumptionProps } from "@db";

export type MessageType = "get-list-day" | "change-goal" | "list-day" | "preferences"
export type MessageOrigin = "smartphone" | "watch"

export interface MessageListDayProps {
  type: MessageType;
  messageOrigin: MessageOrigin
  list: WaterConsumptionProps[]
}

export interface MessageGetListDay {
  type: MessageType;
  messageOrigin: MessageOrigin;
}

export interface MessagePreferences {
  type: MessageType;
  messageOrigin: MessageOrigin;
  preferences: SavedPreferencesProps;
}
