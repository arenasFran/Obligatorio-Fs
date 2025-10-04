import Quote from "../models/quote.model.js";
import { ServiceError } from "../utils/ServiceError.js";

export async function getQuotesByLibraryItem(libraryItemId) {
  return await Quote.find({ libraryItem: libraryItemId });
}

export async function createQuote(data) {
  try {
    const quote = new Quote(data);
    await quote.save();
    return quote;
  } catch (error) {
    throw new ServiceError("No se pudo crear la cita", 400);
  }
}

export async function updateQuote(quoteId, data) {
  const updated = await Quote.findByIdAndUpdate(quoteId, data, { new: true });
  if (!updated) throw new ServiceError("Cita no encontrada", 404);
  return updated;
}

export async function deleteQuote(quoteId) {
  const deleted = await Quote.findByIdAndDelete(quoteId);
  if (!deleted) throw new ServiceError("Cita no encontrada", 404);
  return deleted;
}
