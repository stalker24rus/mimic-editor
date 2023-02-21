import { useSelector } from "react-redux";
import {
  moveOnBackLevel,
  moveOnBottomLevel,
  moveOnForwardLevel,
  moveOnTopLevel,
  alignElementsBottom,
  alignElementsHorizon,
  alignElementsLeft,
  alignElementsRight,
  alignElementsTop,
  alignElementsVerticalAlign,
} from "../../../../../../store/actionCreators/editorElements";
import { selectSelectedElements } from "../../../../../../store/selectors/editorState";
import BackLevel from "../../../../../../ui/Icons/svg/LevelBack";
import BottomAlign from "../../../../../../ui/Icons/svg/AlignBottom";
import BottomLevel from "../../../../../../ui/Icons/svg/LevelBottom";
import ForwardLevel from "../../../../../../ui/Icons/svg/LevelForward";
import HorizonAlign from "../../../../../../ui/Icons/svg/AlignHorizon";
import LeftAlign from "../../../../../../ui/Icons/svg/LeftAlign";
import RightAlign from "../../../../../../ui/Icons/svg/AlignRight";
import TopAlign from "../../../../../../ui/Icons/svg/AlignTop";
import TopLevel from "../../../../../../ui/Icons/svg/LevelTop";
import VerticalAlign from "../../../../../../ui/Icons/svg/AlignVertical";
import { useTypedDispatch } from "../../../../../../store";
import { useCallback, useMemo } from "react";

function ExpressPanel() {
  const selected = useSelector(selectSelectedElements);
  const dispatch = useTypedDispatch();

  const handleMoveOnTopLevel = useCallback(() => {
    dispatch(moveOnTopLevel());
  }, [moveOnTopLevel]);

  const handleMoveOnForwardLevel = useCallback(() => {
    dispatch(moveOnForwardLevel());
  }, [moveOnForwardLevel]);

  const handleMoveOnBottomLevel = useCallback(() => {
    dispatch(moveOnBottomLevel());
  }, [moveOnBottomLevel]);

  const handleMoveOnBackLevel = useCallback(() => {
    dispatch(moveOnBackLevel());
  }, [moveOnBackLevel]);

  const handleAlignElementsLeft = useCallback(() => {
    dispatch(alignElementsLeft());
  }, [alignElementsLeft]);

  const handleAlignElementsHorizon = useCallback(() => {
    dispatch(alignElementsHorizon());
  }, [alignElementsHorizon]);

  const handleAlignElementsRight = useCallback(() => {
    dispatch(alignElementsRight());
  }, [alignElementsRight]);

  const handleAlignElementsTop = useCallback(() => {
    dispatch(alignElementsTop());
  }, [alignElementsTop]);

  const handleAlignElementsVerticalAlign = useCallback(() => {
    dispatch(alignElementsVerticalAlign());
  }, [alignElementsVerticalAlign]);

  const handleAlignElementsBottom = useCallback(() => {
    dispatch(alignElementsBottom());
  }, [alignElementsBottom]);

  const memoSelected = useMemo(() => selected, [selected]);

  return (
    <div
      className="flex inline-flex"
      style={{
        width: "100%",
        borderBottom: "1px solid",
        overflowX: "scroll",
      }}
    >
      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => handleAlignElementsLeft()}
        disabled={!(memoSelected.length > 1)}
      >
        <LeftAlign />
      </button>
      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => handleAlignElementsHorizon()}
        disabled={!(memoSelected.length > 1)}
      >
        <HorizonAlign />
      </button>
      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => handleAlignElementsRight()}
        disabled={!(memoSelected.length > 1)}
      >
        <RightAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => handleAlignElementsTop()}
        disabled={!(memoSelected.length > 1)}
      >
        <TopAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => handleAlignElementsVerticalAlign()}
        disabled={!(memoSelected.length > 1)}
      >
        <VerticalAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={() => handleAlignElementsBottom()}
        disabled={!(memoSelected.length > 1)}
      >
        <BottomAlign />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={handleMoveOnForwardLevel}
        disabled={memoSelected.length !== 1}
      >
        <ForwardLevel />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={handleMoveOnBackLevel}
        disabled={memoSelected.length !== 1}
      >
        <BackLevel />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={handleMoveOnTopLevel}
        disabled={!(memoSelected.length >= 1)}
      >
        <TopLevel />
      </button>

      <button
        className={`text-black  bg-gray-200 hover:bg-gray-500 m-1 rounded disabled:opacity-50`}
        onClick={handleMoveOnBottomLevel}
        disabled={!(memoSelected.length >= 1)}
      >
        <BottomLevel />
      </button>
    </div>
  );
}

export default ExpressPanel;
