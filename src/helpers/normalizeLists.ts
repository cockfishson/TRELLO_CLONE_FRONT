const normalizeCardPositions = (lists: any) => {
  return lists.map((list: any) => {
    const updatedCards = [...list.TrelloCards].sort(
      (a, b) => a.position - b.position,
    );
    return {
      ...list,
      TrelloCards: updatedCards.map((card, index) => ({
        ...card,
        position: index,
      })),
    };
  });
};

export default normalizeCardPositions;
