import { TrelloCard } from "../services/api";

export const normalizeCardPositions = (lists: Array<TrelloCard>) => {
    return lists.map((list: any) => {
      const sortedCards = [...(list.TrelloCards || [])].sort(
        (a, b) => a.position - b.position
      );
      const updatedCards = sortedCards.map((card, index) => ({
        ...card,
        position: index,
      }));
      return { ...list, TrelloCards: updatedCards };
    });
  };
  
export default normalizeCardPositions;
  