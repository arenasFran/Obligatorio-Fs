import LibraryItem from "../models/libraryItem.model.js";
import Quote from "../models/quote.model.js";
import { ServiceError } from "../utils/ServiceError.js";

export async function getQuotesByLibraryItem(libraryItemId, userId) {
  // Ensure the library item belongs to the user
  const lib = await LibraryItem.findOne({ _id: libraryItemId, userId });
  if (!lib) throw new ServiceError("LibraryItem no encontrado", 404);
  return await Quote.find({ libraryItem: libraryItemId });
}

export async function createQuote(userId, data) {
  try {
    // Validate ownership: the target library item must belong to the user
    const lib = await LibraryItem.findOne({ _id: data.libraryItem, userId });
    if (!lib) throw new ServiceError("LibraryItem no encontrado", 404);
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

export async function updateQuote(quoteId, userId, data) {
  // Solo permitir editar pag, content e isFavorite
  const allowedFields = {};
  if (typeof data.pag !== "undefined") allowedFields.pag = data.pag;
  if (typeof data.content !== "undefined") allowedFields.content = data.content;
  if (typeof data.isFavorite !== "undefined")
    allowedFields.isFavorite = data.isFavorite;
  // Ensure the quote belongs to a library item owned by the user
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
