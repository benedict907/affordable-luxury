import React from "react";
import RichTextEditor from "../RichTextEditor";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  setCustomBulletPoints,
  setImportantPoints,
} from "../../redux/createPdfSlice";

export default function CustomBulletPoint() {
  const dispatch = useAppDispatch();
  const { customBulletPoint } = useAppSelector((state) => state.createPdf);
  return (
    <>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
        <h1 className="text-2xl font-bold mb-6">
          Need a custom bullet point list?
        </h1>
        <input
          // ref={ref["customBulletPoint.transfers"]}
          type="text"
          placeholder="Enter a title"
          value={customBulletPoint.title}
          onChange={(e) =>
            dispatch(
              setCustomBulletPoints({
                ...customBulletPoint,
                title: e.target.value,
              })
            )
          }
          className="w-full px-3 py-2 border text-2xl font-bold mb-6 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />

        <form>
          <RichTextEditor
            text={customBulletPoint.bulletPoints}
            onChangeText={(text) =>
              dispatch(
                setCustomBulletPoints({
                  ...customBulletPoint,
                  bulletPoints: text,
                })
              )
            }
          />
        </form>
      </div>
    </>
  );
}
