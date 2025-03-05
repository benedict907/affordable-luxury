import React from "react";
import Row from "../Row";

export default function BulletPoint({ title, bulletPoints }) {
  return (
    <Row style={"text-start"}>
      <div className="p-4">
        {title !== "" ? (
          <h2 className="text-xl font-bold mb-4">{title}</h2>
        ) : null}
        <ul className="list-disc list-inside space-y-2">
          {bulletPoints.map((bulletPoint) => (
            <li>{bulletPoint}</li>
          ))}
        </ul>
      </div>
    </Row>
  );
}
