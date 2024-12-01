import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { updateCard, deleteCard } from "../../redux/slices/cardsSlice";
import { fetchLists } from "../../redux/slices/listsSlice";
import { AppDispatch } from "../../redux/store";
import { logActivity } from "../../helpers/create_activity_log";
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

const DEBOUNCE_DELAY = 200;

const Card: React.FC<CardProps> = ({ card, index, moveCard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);
  const [editDescription, setEditDescription] = useState(
    card.description || "",
  );
  const boardId = useSelector((state: any) => state.boards.activeBoardId);
  const dispatch = useDispatch<AppDispatch>();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debounce = (func: () => void, delay: number) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      func();
      debounceTimer.current = null;
    }, delay);
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { index, listId: card.list_id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover: (draggedItem: any) => {
      if (draggedItem.index === index && draggedItem.listId === card.list_id) {
        return;
      }
      debounce(() => {
        moveCard(draggedItem.index, index, draggedItem.listId, card.list_id);
        draggedItem.index = index;
        draggedItem.listId = card.list_id;
      }, DEBOUNCE_DELAY);
    },
    drop: (draggedItem: any) => {
      if (draggedItem.index !== index || draggedItem.listId !== card.list_id) {
        moveCard(draggedItem.index, index, draggedItem.listId, card.list_id);
      }
    },
  });

  const ref = (node: HTMLDivElement | null) => {
    dragRef(node);
    dropRef(node);
  };

  const handleUpdateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        updateCard({
          cardId: card.card_id,
          data: { title: editTitle, description: editDescription },
        }),
      );
      logActivity(dispatch, "update", `Updated card "${card.title}".`);
      dispatch(fetchLists(boardId));
    } finally {
      closeModal();
    }
  };

  const handleDeleteCard = async () => {
    try {
      await dispatch(deleteCard({ cardId: card.card_id }));
      logActivity(dispatch, "delete", `Deleted card "${card.title}".`);
      dispatch(fetchLists(boardId));
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    dispatch(fetchLists(boardId));
  }, [boardId, dispatch]);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div
        ref={ref}
        className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
        onClick={() => setIsModalOpen(true)}
      >
        <p className={styles.cardTitle}>{card.title}</p>
        {card.description ? (
          <img
            alt="description_icon"
            src="../../../media/description_icon.svg"
            className={styles.descriptionIcon}
          />
        ) : null}
      </div>

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
