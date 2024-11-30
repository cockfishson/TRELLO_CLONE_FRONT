import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveBoard } from "./redux/slices/boardSlice";
import { AppDispatch, RootState } from "./redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/sidebar/sidebar";
import Board from "./components/board/board";
import { fetchActivityLog } from "./redux/slices/activityLogSlice";
import ActivityLog from "./components/activity_log/activityLog";
import Header from "./components/header/header";
import "./App.css";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { logs, loading } = useSelector((state: RootState) => state.activityLog);

  const activeBoardId = useSelector(
    (state: RootState) => state.boards.activeBoardId
  );

  const [isLogVisible, setLogVisibility] = useState(false);

  const handleBoardSelect = (boardId: number) => {
    dispatch(changeActiveBoard(boardId));
  };

  const toggleActivityLog = () => {
    setLogVisibility((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchActivityLog());
  }, [dispatch]);

  return (
    <div className="app-container">
      <Header onToggleActivityLog={toggleActivityLog} />
      <div className="app-main">
        <Sidebar onBoardSelect={handleBoardSelect} />
        <div className="board-container">
          {activeBoardId ? (
            <DndProvider backend={HTML5Backend}>
              <Board boardId={activeBoardId} />
            </DndProvider>
          ) : (
            <div>Please select a board.</div>
          )}
        </div>
        <ActivityLog logs={logs} isLoading={loading} isVisible={isLogVisible} />
      </div>
    </div>
  );
};

export default App;
