import { Order } from "@/model/order-model";

export async function storeOrder(order) {
  try {
    await Order.create(order);
  } catch (error) {
    throw new Error(error);
  }
}
