import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material-next/Button";
import { useBardContext } from "./BardViewContext";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import "./Menu.css";
import { useCallback } from "react";

const RecentQueryRenderer = ({ query }: { query: string }) => {
  const { updateRecentQueryList } = useBardContext();

  const onRecentQueryClick = useCallback(() => {
    updateRecentQueryList(query);
  }, [updateRecentQueryList, query]);

  return (
    <div
      className="recentQueryRenderer a-center cursor-pointer"
      onClick={onRecentQueryClick}
    >
      <ChatBubbleOutlineIcon />
      <div className="query-label">{query}</div>
      <MoreVertSharpIcon />
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
      newChatWindowOpen: true,
    });
  }, [setBardContextValue, bardContextValue]);

  return (
    <div className="menuWebContainer">
      <Button
        color="primary"
        disabled={bardContextValue.newChatWindowOpen}
        variant="filled"
        startIcon={<AddIcon />}
        onClick={handleNewChatClick}
      >
        New chat
      </Button>

      <div className="recents">
        <div className="recent-label">Recent</div>
        <div>
          {bardContextValue.recentUserQueries.map((query) => (
            <RecentQueryRenderer query={query} key={query} />
          ))}
        </div>
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
