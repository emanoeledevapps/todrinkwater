import { database, Origin, RegisterType, WaterConsumptionProps } from "@db";

interface AddConsumptionProps {
  quantity: number;
  formattedDate: string;
  registerType: RegisterType;
  origin: Origin;
}
async function addConsumption({ formattedDate, quantity, registerType, origin }: AddConsumptionProps) {
  await database.insertConsumption({ formattedDate, quantity, registerType, origin })
}

interface GetConsumptionPerDayProps {
  formattedDate: string;
}
async function getConsumptionPerDay({ formattedDate }: GetConsumptionPerDayProps): Promise<WaterConsumptionProps[]> {
  const response = await database.getConsumptionPerDay({ formattedDate })
  return response
}

interface CheckConsumptionExistsProps {
  createdAt: string;
}
async function checkConsumptionExists({ createdAt }: CheckConsumptionExistsProps): Promise<boolean> {
  const response = await database.consumptionExists({ createdAt })
  return response
}

async function addConsumptionFromConnectivity(data: WaterConsumptionProps): Promise<void> {
  await database.insertConsumptionFromConnectivity({
    id: data.id,
    created_at: data.created_at,
    formatted_date: data.formatted_date,
    origin: data.origin,
    quantity: data.quantity,
    register_type: data.register_type,
    excluded: data.excluded
  })
}

export const dbService = {
  addConsumption,
  getConsumptionPerDay,
  checkConsumptionExists,
  addConsumptionFromConnectivity
}