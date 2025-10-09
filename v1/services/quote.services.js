import LibraryItem from "../models/libraryItem.model.js";
import Quote from "../models/quote.model.js";
import { ServiceError } from "../utils/ServiceError.js";

export async function getQuotesByLibraryItem(libraryItemId, userId) {
  const lib = await LibraryItem.findOne({ _id: libraryItemId, userId });
  if (!lib) throw new ServiceError("LibraryItem no encontrado", 404);
  return await Quote.find({ libraryItem: libraryItemId });
}

export async function createQuote(userId, data) {
  try {

    const lib = await LibraryItem.findOne({ _id: data.libraryItem, userId });
    if (!lib) throw new ServiceError("LibraryItem no encontrado", 404);
    const quote = new Quote(data);
    await quote.save();
    await LibraryItem.findByIdAndUpdate(quote.libraryItem, {
      $push: { quotes: quote._id },
    });
    return quote;
  } catch (error) {
    throw new ServiceError("No se pudo crear la cita", 400);
  }
}

export async function updateQuote(quoteId, userId, data) {
  const allowedFields = {};
  if (typeof data.pag !== "undefined") allowedFields.pag = data.pag;
  if (typeof data.content !== "undefined") allowedFields.content = data.content;
  if (typeof data.isFavorite !== "undefined")
    allowedFields.isFavorite = data.isFavorite;
  const quote = await Quote.findById(quoteId);
  if (!quote) throw new ServiceError("Cita no encontrada", 404);
  const lib = await LibraryItem.findOne({ _id: quote.libraryItem, userId });
  if (!lib) throw new ServiceError("No autorizado", 403);
  const updated = await Quote.findByIdAndUpdate(quoteId, allowedFields, {
    new: true,
  });
  if (!updated) throw new ServiceError("Cita no encontrada", 404);
  return updated;
}

export async function deleteQuote(quoteId, userId) {
  const quote = await Quote.findById(quoteId);
  if (!quote) throw new ServiceError("Cita no encontrada", 404);
  // Ensure ownership
  const lib = await LibraryItem.findOne({ _id: quote.libraryItem, userId });
  if (!lib) throw new ServiceError("No autorizado", 403);
  const deleted = await Quote.findByIdAndDelete(quoteId);
  if (!deleted) throw new ServiceError("Cita no encontrada", 404);
  return deleted;
}
