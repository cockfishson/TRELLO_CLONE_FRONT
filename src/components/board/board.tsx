import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists, createList, updateLists } from "../../redux/slices/listsSlice";
import List from "../list/list";
import Modal from "../modalWindow/modalWindow";
import normalizeCardPositions from "../../helpers/normalizeLists";
import * as styles from "./board.css";
import { AppDispatch } from "../../redux/store";
import { updateCard } from "../../redux/slices/cardsSlice";

interface BoardProps {
  boardId: number;
}

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector((state: any) => state.lists.lists);
  const sortedLists = [...lists].sort(
    (a: any, b: any) => a.position - b.position,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const fetchListsHandler = useCallback(async (): Promise<void> => {
    try {
      const fetchedListsAction = await dispatch(fetchLists(boardId));
      const fetchedLists = fetchedListsAction.payload;
      if (!Array.isArray(fetchedLists)) {
        throw new TypeError("Fetched lists must be an array.");
      }
      const normalizedLists = normalizeCardPositions(fetchedLists);
      dispatch(updateLists({ boardId, lists: normalizedLists }));
    } catch (error) {
      console.error("Error fetching and normalizing lists:", error);
    }
  }, [dispatch, boardId]);
  

  useEffect(() => {
    fetchListsHandler();
  }, [boardId, fetchListsHandler]);

  const moveCard = async (
    dragIndex: number,
    hoverIndex: number,
    dragListId: number,
    hoverListId: number
  ) => {
    const currentLists = [...lists].map((list) => ({
      ...list,
      TrelloCards: [...list.TrelloCards],
    }));
  
    const sourceList = currentLists.find((list) => list.list_id === dragListId);
    const targetList = currentLists.find((list) => list.list_id === hoverListId);
  
    if (!sourceList || !targetList) return;
    if (dragIndex < 0 || dragIndex >= sourceList.TrelloCards.length) return;
  
    const draggedCard = sourceList.TrelloCards[dragIndex];
    if (!draggedCard) return;
    try {
      await dispatch(
        updateCard({
          cardId: draggedCard.card_id,
          data: { list_id: hoverListId, position: hoverIndex },
        })
      );
      fetchListsHandler();
    } catch (error) {
      console.error("Error updating card position:", error);
    }
  };
  

  const handleAddList = () => {
    setModalTitle("Create New List");
    setIsModalOpen(true);
  };

  const handleCreateList = (title: string) => {
    dispatch(createList({ boardId, title, position: lists.length + 1 }))
      .then(() => {
        setIsModalOpen(false);
        fetchListsHandler();
      })
      .catch((error) => {
        console.error("Failed to create list:", error);
      });
  };

  return (
    <div className={styles.board}>
      {sortedLists.map((list: any) => (
        <List
          key={list.list_id}
          list={list}
          fetchLists={fetchListsHandler}
          moveCard={moveCard}
        />
      ))}
      <button onClick={handleAddList} className={styles.addListButton}>
        Add List
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const title = formData.get("title") as string;
            handleCreateList(title);
          }}
        >
          <label>
            Title:
            <input name="title" type="text" required />
          </label>
          <button type="submit">Create</button>
        </form>
      </Modal>
    </div>
  );
};

export default Board;
