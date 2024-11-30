import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBoard,
  fetchBoards,
  updateBoard,
  deleteBoard,
  changeActiveBoard,
} from "../../redux/slices/boardSlice";
import { RootState, AppDispatch } from "../../redux/store";
import * as style from "./sidebar.css";
import Modal from "../modalWindow/modalWindow";
import { createActivityLog } from "../../redux/slices/activityLogSlice.ts";

const Sidebar: React.FC<{ onBoardSelect: (boardId: number) => void }> = ({
  onBoardSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const selectedBoardId = useSelector(
    (state: RootState) => state.boards.activeBoardId,
  );
  const { boards, loading, error } = useSelector(
    (state: RootState) => state.boards,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  if (loading) return <div className={style.sidebarStyle}>Loading...</div>;
  if (error) return <div className={style.sidebarStyle}>Error: {error}</div>;

  const handleBoardClick = (boardId: number) => {
    dispatch(changeActiveBoard(boardId));
    onBoardSelect(boardId);
  };

  const openCreateBoardModal = () => {
    setModalTitle("Create New Board");
    setModalContent(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const title = formData.get("title") as string;
          dispatch(createBoard(title))
            .then(() => {
              dispatch(
                createActivityLog({
                  action_type: "create",
                  action_details: `Created board "${title}".`,
                }),
              );
              return dispatch(fetchBoards());
            })
            .catch((error) => {
              console.error("Failed to create board:", error);
            })
            .finally(() => {
              setIsModalOpen(false);
            });
        }}
      >
        <label>
          Title:
          <input name="title" type="text" required />
        </label>
        <button type="submit">Create</button>
      </form>,
    );
    setIsModalOpen(true);
  };

  const openEditBoardModal = (boardId: number, currentTitle: string) => {
    setModalTitle("Edit Board");
    setModalContent(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const newTitle = formData.get("title") as string;
          dispatch(updateBoard({ boardId, newTitle }))
            .then(() => {
              dispatch(
                createActivityLog({
                  action_type: "update",
                  action_details: `Changed board title from "${currentTitle}" to "${newTitle}".`,
                }),
              );
              return dispatch(fetchBoards());
            })
            .catch((error) => {
              console.error("Failed to update board:", error);
            })
            .finally(() => {
              setIsModalOpen(false);
            });
        }}
      >
        <label>
          New Title:
          <input
            name="title"
            type="text"
            defaultValue={currentTitle}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>,
    );
    setIsModalOpen(true);
  };

  const openDeleteBoardModal = (boardId: number) => {
    const board = boards.find((b) => b.board_id === boardId);
    if (!board) return;

    setModalTitle("Confirm Delete");
    setModalContent(
      <div>
        <p>Are you sure you want to delete the board "{board.title}"?</p>
        <button
          onClick={() => {
            dispatch(deleteBoard(boardId))
              .then(() => {
                dispatch(
                  createActivityLog({
                    action_type: "delete",
                    action_details: `Deleted board "${board.title}".`,
                  }),
                );
                return dispatch(fetchBoards());
              })
              .catch((error) => {
                console.error("Failed to delete board:", error);
              })
              .finally(() => {
                setIsModalOpen(false);
              });
          }}
        >
          Yes
        </button>
        <button onClick={() => setIsModalOpen(false)}>No</button>
      </div>,
    );
    setIsModalOpen(true);
  };

  return (
    <div className={style.sidebarStyle}>
      <div className={style.headerRow}>
        <h2 className={style.sidebarHeader}>Your Boards</h2>
        <button className={style.addBoardButton} onClick={openCreateBoardModal}>
          +
        </button>
      </div>
      <ul className={style.boardList}>
        {boards.map((board) => (
          <li
            key={board.board_id}
            className={`${style.boardItemStyle} ${
              selectedBoardId === board.board_id ? style.activeBoard : ""
            }`}
            onClick={() => handleBoardClick(board.board_id)}
          >
            <span>{board.title}</span>
            <div className={style.buttonRow}>
              <button
                className={style.boardButtonStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  openEditBoardModal(board.board_id, board.title);
                }}
              >
                ✎
              </button>
              <button
                className={style.boardButtonStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteBoardModal(board.board_id);
                }}
              >
                🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default Sidebar;
