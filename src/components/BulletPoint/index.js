import React from "react";
import Row from "../Row";
import { EMPTY_BULLETS } from "../../constants/constants";

export default function BulletPoint({ title, bulletPoints }) {
  console.log("ddd", bulletPoints);
  return (
    <Row style={"text-start"}>
      <div className="p-4">
        {title !== "" ? (
          <h2 className="text-xl font-bold mb-4">{title}</h2>
        ) : null}
        {bulletPoints !== EMPTY_BULLETS ? (
          <div
            className="bullet list-disc marker:text-black-2"
            dangerouslySetInnerHTML={{
              __html: bulletPoints?.replace(/<ul>/g, '<ul class="list-disc">'),
            }}
          />
        ) : null}
      </div>
    </Row>
  );
}
