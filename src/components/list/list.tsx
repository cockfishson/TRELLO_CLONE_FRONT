import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../card/card";
import { createCard } from "../../redux/slices/cardsSlice";
import { updateList, deleteList } from "../../redux/slices/listsSlice";
import Modal from "../modalWindow/modalWindow";
import * as styles from "./list.css";
import { AppDispatch } from "../../redux/store";
import { useDrop } from "react-dnd";
import { logActivity } from "../../helpers/create_activity_log";

interface CardType {
  card_id: number;
  title: string;
  description?: string;
  position: number;
  list_id: number;
}

interface ListProps {
  list: {
    list_id: number;
    title: string;
    position: number;
    TrelloCards: CardType[];
  };
  fetchLists: () => Promise<void>;
  moveCard: (
    dragIndex: number,
    hoverIndex: number,
    dragListId: number,
    hoverListId: number,
  ) => void;
}

const List: React.FC<ListProps> = ({ list, fetchLists, moveCard }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleAddCard = async (title: string) => {
    if (!title.trim()) return;

    try {
      await dispatch(
        createCard({
          listId: list.list_id,
          data: { title, description: "", position: list.TrelloCards.length },
        }),
      );
      logActivity(
        dispatch,
        "create",
        `Created card "${title}" in list "${list.title}".`,
      );
      fetchLists();
    } finally {
      setIsModalOpen(false);
    }
  };

  const [, dropRef] = useDrop({
    accept: "CARD",
    drop: (item: any) => {
      moveCard(item.index, list.TrelloCards.length, item.listId, list.list_id);
    },
  });

  const handleEditList = async (newTitle: string) => {
    if (!newTitle.trim()) return;

    const oldTitle = list.title;
    try {
      await dispatch(
        updateList({ listId: list.list_id, data: { title: newTitle } }),
      );
      logActivity(
        dispatch,
        "update",
        `Changed list title from "${oldTitle}" to "${newTitle}".`,
      );
      fetchLists();
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteList = async () => {
    const listTitle = list.title;
    try {
      await dispatch(deleteList(list.list_id));
      logActivity(dispatch, "delete", `Deleted list "${listTitle}".`);
      fetchLists();
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div ref={dropRef} className={styles.list}>
      <div className={styles.listHeader}>
        <h4 className={styles.listTitle}>{list.title}</h4>
        <div className={styles.buttonRow}>
          <button
            className={styles.boardButtonStyle}
            onClick={() =>
              openModal(
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const newTitle = formData.get("title") as string;
                    handleEditList(newTitle);
                  }}
                >
                  <label>
                    New Title:
                    <input
                      name="title"
                      type="text"
                      defaultValue={list.title}
                      required
                    />
                  </label>
                  <button type="submit">Update</button>
                </form>,
              )
            }
          >
            ✎
          </button>
          <button
            className={styles.boardButtonStyle}
            onClick={() =>
              openModal(
                <div>
                  <p>Are you sure you want to delete this list?</p>
                  <button onClick={handleDeleteList}>Yes</button>
                  <button onClick={() => setIsModalOpen(false)}>No</button>
                </div>,
              )
            }
          >
            🗑
          </button>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {[...(list.TrelloCards ?? [])]
          .sort((a, b) => a.position - b.position)
          .map((card, idx) => (
            <Card
              key={card.card_id}
              card={card}
              index={idx}
              moveCard={moveCard}
            />
          ))}
      </div>
      <button
        onClick={() =>
          openModal(
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const title = formData.get("title") as string;
                handleAddCard(title);
              }}
            >
              <label>
                Card Title:
                <input name="title" type="text" required />
              </label>
              <button type="submit">Add Card</button>
            </form>,
          )
        }
        className={styles.addCardButton}
      >
        Add Card
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modal"
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default List;
