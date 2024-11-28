import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCard,
  deleteCard,
  clearDraggedCard,
} from "../../redux/slices/cardsSlice";
import { fetchLists } from "../../redux/slices/listsSlice";
import { AppDispatch } from "../../redux/store";
import { useDrag, useDrop } from "react-dnd";
import { createActivityLog } from "../../redux/slices/activityLogSlice";
import Modal from "../modalWindow/modalWindow";
import * as styles from "./card.css";

interface CardProps {
  card: {
    card_id: number;
    list_id: number;
    title: string;
    description?: string;
    position: number;
  };
  index: number;
  moveCard: (
    dragIndex: number,
    hoverIndex: number,
    dragListId: number,
    hoverListId: number,
  ) => void;
}

const Card: React.FC<CardProps> = ({ card, index, moveCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const boardId = useSelector((state: any) => state.boards.activeBoardId);
  const dispatch = useDispatch<AppDispatch>();
  const [editTitle, setEditTitle] = useState(card.title);
  const [editDescription, setEditDescription] = useState(
    card.description || "",
  );

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "CARD",
    item: { card, index, listId: card.list_id },
    end: () => dispatch(clearDraggedCard()),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));


  const [, dropRef] = useDrop(() => ({
    accept: "CARD",
    hover: (draggedItem: any) => {
      const { index: dragIndex, listId: dragListId } = draggedItem;
      if (dragIndex === index && dragListId === card.list_id) return;
      moveCard(dragIndex, index, dragListId, card.list_id);
      draggedItem.index = index;
      draggedItem.listId = card.list_id;
    },
  }));

  const ref = (node: HTMLDivElement | null) => {
    dragRef(node);
    dropRef(node);
  };

  const handleUpdateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      updateCard({
        cardId: card.card_id,
        data: { title: editTitle, description: editDescription },
      }),
    );
    await dispatch(
      createActivityLog({
        action_type: "update",
        action_details: `Updated card "${card.title}".`,
      }),
    );
    closeModal();
  };

  const handleDeleteCard = async () => {
    await dispatch(deleteCard({cardId: card.card_id }));
    await dispatch(
      createActivityLog({
        action_type: "delete",
        action_details: `Deleted card "${card.title}".`,
      }),
    );
    closeModal();
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    dispatch(fetchLists(boardId));
  }, [boardId, dispatch]);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
      onClick={() => setIsModalOpen(true)}
    >
      <p className={styles.cardTitle}>{card.title}</p>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Card">
        <form onSubmit={handleUpdateCard}>
          <label>
            Title:
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={styles.input}
            />
          </label>
          <label>
            Description:
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className={styles.textarea}
            />
          </label>
          <div>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleDeleteCard}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Card;
