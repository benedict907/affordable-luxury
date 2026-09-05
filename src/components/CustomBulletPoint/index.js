import React from "react";
import RichTextEditor from "../RichTextEditor";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setCustomBulletPoints } from "../../redux/createPdfSlice";

export default function CustomBulletPoint() {
  const dispatch = useAppDispatch();
  const { customBulletPoint } = useAppSelector((state) => state.createPdf);
  return (
    <div className="card w-full max-w-4xl p-6 sm:p-8 mb-10">
      <h1 className="text-2xl font-bold mb-6">
        Need a custom bullet point list?
      </h1>
      <input
        type="text"
        placeholder="Enter a title"
        value={customBulletPoint?.title}
        onChange={(e) =>
          dispatch(
            setCustomBulletPoints({
              ...customBulletPoint,
              title: e.target.value,
            })
          )
        }
        className="text-input text-xl font-bold mb-6"
      />

      <form>
        <RichTextEditor
          text={customBulletPoint?.bulletPoints}
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
  );
}
