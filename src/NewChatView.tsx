import { useCallback, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./NewChatView.css";

import { PromptTiles } from "./PromptTiles";
import { useBardContext } from "./BardViewContext";
import { IconButton } from "@mui/material";

export const NewChatView = () => {
  const { bardContextValue, updateRecentQueryList } = useBardContext();
  const [promptTilesConfig, setPromptTilesConfig] = useState("1");

  const [inputQuery, setInputQuery] = useState(
    bardContextValue.prefillInputText || ""
  );

  const handleInputQueryChange = useCallback(
    (e: any) => {
      setInputQuery(e.target.value);
    },
    [setInputQuery]
  );

  useEffect(() => {
    if (bardContextValue.prefillInputText) {
      setInputQuery(bardContextValue.prefillInputText);
    }
  }, [setInputQuery, bardContextValue.prefillInputText]);

  const onRefreshClick = useCallback(() => {
    // on refresh click, we'll randomly set a config and that will refresh the prompt tiles below
    const configArr = ["1", "2", "3"];
    const random = Math.floor(Math.random() * configArr.length);
    setPromptTilesConfig(configArr[random]);
  }, [setPromptTilesConfig]);

  const handleQuerySendClick = useCallback(() => {
    if (inputQuery) {
      updateRecentQueryList(inputQuery);
    }
  }, [inputQuery, updateRecentQueryList]);

  const isMobileView = bardContextValue.isMobileView;

  const isNewChatWindowOpened = bardContextValue.newChatWindowOpen;
  const userQueryResponse = bardContextValue.userQueryResponse;

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

              <PromptTiles configId={promptTilesConfig} />
            </>
          ) : null}

          {userQueryResponse?.ok && userQueryResponse.data ? (
            <div>Show data here</div>
          ) : null}

          {userQueryResponse?.fetching ? <div>Fetching</div> : null}

          {userQueryResponse?.error ? <div>Error in fetching data</div> : null}
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
              onChange={handleInputQueryChange}
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
