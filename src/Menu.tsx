import Button from "@mui/material-next/Button";
import { IUserQuery, useBardContext } from "./BardViewContext";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import "./Menu.css";
import { useCallback, useRef } from "react";

const RecentQueryRenderer = ({ query }: { query: IUserQuery }) => {
  const { bardContextValue, setBardContextValue } = useBardContext();

  const onRecentQueryClick = useCallback(() => {
    setBardContextValue({
      ...bardContextValue,
      newChatWindowOpen: false,
      activeUserQuery: query,
    });
  }, [bardContextValue, setBardContextValue, query]);

  return (
    <div
      className={`recentQueryRenderer a-center cursor-pointer ${
        bardContextValue.activeUserQuery?.id === query.id ? "selectedRQ" : ""
      }`}
      onClick={onRecentQueryClick}
    >
      <div className="recentLabelLeftIcon">
        <ChatBubbleOutlineIcon fontSize="small" />
      </div>
      <div className="query-label" title={query.tags?.[0] || query.label}>
        {query.tags?.[0] || query.label}
      </div>
      <div>
        <MoreVertSharpIcon />
      </div>
    </div>
  );
};

const MenuMobileView = () => {
  return null;
};

const MenuWebView = () => {
  const { bardContextValue, setBardContextValue } = useBardContext();

  const handleNewChatClick = useCallback(() => {
    setBardContextValue({
      ...bardContextValue,
      activeUserQuery: undefined,
      newChatWindowOpen: true,
    });
  }, [setBardContextValue, bardContextValue]);

  const menuWebContainerRef = useRef(null);

  const isButtonDisabled = bardContextValue.newChatWindowOpen;
  return (
    <div className="menuWebContainer" ref={menuWebContainerRef}>
      <div className="fadeinleft">
        <Button
          color="primary"
          disabled={isButtonDisabled}
          variant="filled"
          onClick={handleNewChatClick}
          className={isButtonDisabled ? "" : "newChatBtn"}
        >
          + New chat
        </Button>

        {bardContextValue.recentUserQueries.length ? (
          <div className="recents">
            <div className="recent-label">Recent</div>
            <div>
              {bardContextValue.recentUserQueries.map((query) => (
                <RecentQueryRenderer query={query} key={query.id} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const Menu = () => {
  const { bardContextValue } = useBardContext();
  if (!bardContextValue.isMenuOpen) {
    return null;
  }

  return (
    <>{bardContextValue.isMobileView ? <MenuMobileView /> : <MenuWebView />}</>
  );
};
