import { configMap } from "./promptTilesConfig";
import "./PromptTiles.css";
import { useBardContext } from "./BardViewContext";
import { useCallback } from "react";

export const PromptTiles = ({ configId }: { configId: string }) => {
  const tilesData = (configMap as any)[configId];

  const { bardContextValue, setBardContextValue } = useBardContext();

  const onOptionClick = useCallback(
    (txt: string) => {
      setBardContextValue({
        ...bardContextValue,
        prefillInputText: txt,
      });
    },
    [setBardContextValue, bardContextValue]
  );

  return (
    <div className="prompt-tiles j-btw">
      {tilesData.map((data: any, index: number) => (
        <div className="prompt-tile" key={data.heading}>
          <div className={`prompt-tile-heading heading-${index}`}>
            {data.heading}
          </div>
          <div
            className="prompt-option cursor-pointer"
            onClick={() => onOptionClick(data.option1.description)}
          >
            {data.option1.label}
          </div>
          <div
            className="prompt-option cursor-pointer"
            onClick={() => onOptionClick(data.option2.description)}
          >
            {data.option2.label}
          </div>
          <div
            className="prompt-option cursor-pointer"
            onClick={() => onOptionClick(data.option3.description)}
          >
            {data.option3.label}
          </div>
        </div>
      ))}
    </div>
  );
};
