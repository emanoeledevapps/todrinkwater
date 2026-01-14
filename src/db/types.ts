export type RegisterType = "glass" | "bottle";
export type Origin = "smartphone" | "watch";

export interface WaterConsumptionProps {
  id: string;
  quantity: number;
  created_at: string;
  formatted_date: string;
  register_type: RegisterType;
  origin: Origin;
  excluded: boolean
}