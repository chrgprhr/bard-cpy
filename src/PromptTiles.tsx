import { configMap } from "./promptTilesConfig";
import "./PromptTiles.css";
import { IUserQuery, useBardContext } from "./BardViewContext";
import { useCallback } from "react";

export const PromptTiles = ({
  configId,
  onTileClick,
}: {
  configId: string;
  onTileClick: () => void;
}) => {
  const tilesData = configMap[configId];

  const { bardContextValue, setBardContextValue } = useBardContext();

  const onOptionClick = useCallback(
    (data: IUserQuery) => {
      onTileClick();
      setBardContextValue({
        ...bardContextValue,
        activeUserQuery: data,
      });
    },
    [setBardContextValue, bardContextValue, onTileClick]
  );

  return (
    <div className="prompt-tiles j-btw">
      {tilesData.map((data, index: number) => (
        <div className="prompt-tile" key={data.heading}>
          <div className={`prompt-tile-heading heading-${index}`}>
            {data.heading}
          </div>
          <div
            className={`prompt-option cursor-pointer fadein ${
              bardContextValue.activeUserQuery?.label === data.option1.label
                ? "selected"
                : ""
            }`}
            onClick={() => onOptionClick(data.option1)}
          >
            {data.option1.label}
          </div>
          <div
            className={`prompt-option cursor-pointer fadein ${
              bardContextValue.activeUserQuery?.label === data.option2.label
                ? "selected"
                : ""
            }`}
            onClick={() => onOptionClick(data.option2)}
          >
            {data.option2.label}
          </div>
          <div
            className={`prompt-option cursor-pointer fadein ${
              bardContextValue.activeUserQuery?.label === data.option3.label
                ? "selected"
                : ""
            }`}
            onClick={() => onOptionClick(data.option3)}
          >
            {data.option3.label}
          </div>
        </div>
      ))}
    </div>
  );
};
