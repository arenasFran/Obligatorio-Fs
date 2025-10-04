import {
  createQuote,
  deleteQuote,
  getQuotesByLibraryItem,
  updateQuote,
} from "../services/quote.services.js";

export async function getQuotesByLibraryItemController(req, res, next) {
  try {
    const { libraryItemId } = req.params;
    const quotes = await getQuotesByLibraryItem(libraryItemId);
    res.json(quotes);
  } catch (error) {
    next(error);
  }
}

export async function createQuoteController(req, res, next) {
  try {
    const quote = await createQuote(req.body);
    res.status(201).json(quote);
  } catch (error) {
    next(error);
  }
}

export async function updateQuoteController(req, res, next) {
  try {
    const { quoteId } = req.params;
    const updated = await updateQuote(quoteId, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteQuoteController(req, res, next) {
  try {
    const { quoteId } = req.params;
    const deleted = await deleteQuote(quoteId);
    res.json({ message: "Cita eliminada", deleted });
  } catch (error) {
    next(error);
  }
}
