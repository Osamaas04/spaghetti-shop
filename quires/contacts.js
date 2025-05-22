import { Contact } from "@/model/contact-model";

export async function storeContact(contact) {
  try {
    await Contact.create(contact);
  } catch (error) {
    throw new Error(error);
  }
}
