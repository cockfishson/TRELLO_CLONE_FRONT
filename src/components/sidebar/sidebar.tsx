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
import {
  fetchActivityLog,
  createActivityLog,
} from "../../redux/slices/activityLogSlice";

const Sidebar: React.FC<{ onBoardSelect: (boardId: number) => void }> = ({
  onBoardSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedId = useSelector(
    (state: RootState) => state.boards.activeBoardId,
  );
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { boards, loading, error } = useSelector(
    (state: RootState) => state.boards,
  );
  const { logs, loading: logsLoading } = useSelector(
    (state: RootState) => state.activityLog,
  );

  const handleBoardChange = () => {
    setSelectedBoardId(selectedId);
  };

  useEffect(() => {
    dispatch(fetchBoards());
    dispatch(fetchActivityLog());
  }, [dispatch]);

  if (loading) return <div className={style.sidebarStyle}>Loading...</div>;
  if (error) return <div className={style.sidebarStyle}>Error: {error}</div>;

  const handleBoardClick = (boardId: number) => {
    dispatch(changeActiveBoard(boardId));
    handleBoardChange();
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
            .then((action) => {
              if (action.meta.requestStatus === "fulfilled") {
                dispatch(fetchBoards());
                dispatch(
                  createActivityLog({
                    action_type: "create",
                    action_details: `Created board with title "${title}".`,
                  }),
                );
              }
              setIsModalOpen(false);
            })
            .catch((error) => {
              console.error("Failed to create board:", error);
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
            .then((action) => {
              if (action.meta.requestStatus === "fulfilled") {
                dispatch(fetchBoards());
                dispatch(
                  createActivityLog({
                    action_type: "update",
                    action_details: `Updated board ID ${boardId} to title "${newTitle}".`,
                  }),
                );
              }
              setIsModalOpen(false);
            })
            .catch((error) => {
              console.error("Failed to update board:", error);
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
    setModalTitle("Confirm Delete");
    setModalContent(
      <div>
        <p>Are you sure you want to delete this board?</p>
        <button
          onClick={() => {
            dispatch(deleteBoard(boardId))
              .then((action) => {
                if (action.meta.requestStatus === "fulfilled") {
                  dispatch(fetchBoards());
                  dispatch(
                    createActivityLog({
                      action_type: "delete",
                      action_details: `Deleted board with ID ${boardId}.`,
                    }),
                  );
                }
                setIsModalOpen(false);
              })
              .catch((error) => {
                console.error("Failed to delete board:", error);
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
        <h2 className={style.sidebarHeader}>Your boards</h2>
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
      <h2 className={style.sidebarHeader}>Activity Log</h2>
      <div className={style.activityLog}>
        {logsLoading ? (
          <p>Loading logs...</p>
        ) : (
          <ul className={style.activityLogList}>
            {logs.map((log) => (
              <li key={log.activity_id} className={style.activityLogItem}>
                <p>{log.user_name_and_surname}</p>
                <p>{log.action_details}</p>
                <small>{new Date(log.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
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
