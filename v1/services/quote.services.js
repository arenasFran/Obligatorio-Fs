import LibraryItem from "../models/libraryItem.model.js";
import Quote from "../models/quote.model.js";
import { ServiceError } from "../utils/ServiceError.js";

export async function getQuotesByLibraryItem(libraryItemId) {
  return await Quote.find({ libraryItem: libraryItemId });
}

export async function createQuote(data) {
  try {
    const quote = new Quote(data);
    await quote.save();
    // Push el ID de la quote al array de quotes del LibraryItem
    await LibraryItem.findByIdAndUpdate(quote.libraryItem, {
      $push: { quotes: quote._id },
    });
    return quote;
  } catch (error) {
    throw new ServiceError("No se pudo crear la cita", 400);
  }
}

export async function updateQuote(quoteId, data) {
  // Solo permitir editar pag, content e isFavorite
  const allowedFields = {};
  if (typeof data.pag !== "undefined") allowedFields.pag = data.pag;
  if (typeof data.content !== "undefined") allowedFields.content = data.content;
  if (typeof data.isFavorite !== "undefined") allowedFields.isFavorite = data.isFavorite;
  const updated = await Quote.findByIdAndUpdate(quoteId, allowedFields, { new: true });
  if (!updated) throw new ServiceError("Cita no encontrada", 404);
  return updated;
}

export async function deleteQuote(quoteId) {
  const deleted = await Quote.findByIdAndDelete(quoteId);
  if (!deleted) throw new ServiceError("Cita no encontrada", 404);
  return deleted;
}
