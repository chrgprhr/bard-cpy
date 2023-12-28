import { useCallback, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./NewChatView.css";

import { PromptTiles } from "./PromptTiles";
import { useBardContext } from "./BardViewContext";
import { IconButton } from "@mui/material";
import { Response } from "./Response";
export const NewChatView = () => {
  const queryInputRef = useRef(null);
  const { bardContextValue, handleQuerySubmission } = useBardContext();
  const [promptTilesConfig, setPromptTilesConfig] = useState("1");

  const activeUserQueryDescription =
    bardContextValue.activeUserQuery?.description;

  const [inputQuery, setInputQuery] = useState(
    activeUserQueryDescription || ""
  );

  useEffect(() => {
    if (activeUserQueryDescription) {
      setInputQuery(activeUserQueryDescription);
    }
  }, [setInputQuery, activeUserQueryDescription]);

  const onRefreshClick = useCallback(() => {
    // on refresh click, we'll randomly set a config and that will refresh the prompt tiles below
    const configArr = ["1", "2", "3"];
    const random = Math.floor(Math.random() * configArr.length);
    setPromptTilesConfig(configArr[random]);
  }, [setPromptTilesConfig]);

  const handleQuerySendClick = useCallback(() => {
    if (inputQuery) {
      handleQuerySubmission(inputQuery);
      setInputQuery("");
    }
  }, [inputQuery, handleQuerySubmission]);

  const onQueryInputChange = (e: any) => {
    setInputQuery(e.target.value);
  };

  const handleKeyUp = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleQuerySendClick();
    }
  };

  const isMobileView = bardContextValue.isMobileView;

  const isNewChatWindowOpened = bardContextValue.newChatWindowOpen;

  const setupInput = () => {
    (queryInputRef.current as any)?.focus();
  };

  const handlePromptTileClick = () => {
    setupInput();
  };

  useEffect(() => {
    setupInput();
  }, []);

  return (
    <>
      <div className={`chat-view ${isMobileView ? "chat-view-mobile" : ""}`}>
        <div
          className={`${
            isMobileView ? "chat-view-child-mobile" : "chat-view-child"
          } tiles-section`}
        >
          {isNewChatWindowOpened ? (
            <>
              <div className="top-row j-btw">
                <div>
                  <img
                    _ngcontent-ng-c3877805786=""
                    alt="bard-cpy-img"
                    src="https://www.gstatic.com/lamda/images/sparkle_resting_v2_1ff6f6a71f2d298b1a31.gif"
                    width={36}
                    height={36}
                  />
                </div>

                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={onRefreshClick}
                >
                  <RefreshIcon color="primary" />
                </IconButton>
              </div>
              <div className="head1">Hello again</div>
              <div className="head2">
                Tell me what’s on your mind, or pick a suggestion.
              </div>

              <PromptTiles
                configId={promptTilesConfig}
                onTileClick={handlePromptTileClick}
              />
            </>
          ) : null}

          <Response />
        </div>

        <div
          className={`${
            isMobileView ? "chat-view-child-mobile" : "chat-view-child"
          } input-section`}
        >
          <div className="a-center">
            <input
              className="bard-input"
              placeholder="Enter a prompt here"
              value={inputQuery}
              onChange={onQueryInputChange}
              onKeyUp={handleKeyUp}
              ref={queryInputRef}
            />
            <div className="send-icon j-center" onClick={handleQuerySendClick}>
              <SendIcon color={inputQuery ? "primary" : "disabled"} />
            </div>
          </div>
          <p className="input-warning">
            Bard may display inaccurate info, including about people, so
            double-check its responses. Your privacy & Bard
          </p>
        </div>
      </div>
    </>
  );
};
