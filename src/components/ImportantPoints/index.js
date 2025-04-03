import React from "react";
import RichTextEditor from "../RichTextEditor";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setImportantPoints } from "../../redux/createPdfSlice";

export default function ImportantPoints() {
  const dispatch = useAppDispatch();
  const { importantPoints } = useAppSelector((state) => state.createPdf);
  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
      <h1 className="text-2xl font-bold mb-6">Important Points</h1>
      <form>
        <RichTextEditor
          text={importantPoints}
          onChangeText={(text) => dispatch(setImportantPoints(text))}
        />
      </form>
    </div>
  );
}
