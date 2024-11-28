import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveBoard } from "./redux/slices/boardSlice";
import { AppDispatch, RootState } from "./redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/sidebar/sidebar";
import Board from "./components/board/board";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeBoardId = useSelector(
    (state: RootState) => state.boards.activeBoardId,
  );

  const handleBoardSelect = (boardId: number) => {
    dispatch(changeActiveBoard(boardId));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onBoardSelect={handleBoardSelect} />
      {activeBoardId ? (
        <DndProvider backend={HTML5Backend}>
          <Board boardId={activeBoardId} />
        </DndProvider>
      ) : (
        <div>Please select a board.</div>
      )}
    </div>
  );
};

export default App;
