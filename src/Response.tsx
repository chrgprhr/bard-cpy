import { useBardContext } from "./BardViewContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Response.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { d1 } from "./demoResponses";

export const Response = () => {
  const { bardContextValue } = useBardContext();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Simulate the fetching state
    setTimeout(() => {
      setFetching(false);
    }, 2000);
  }, [bardContextValue.activeUserQuery?.description]);

  if (!bardContextValue.activeUserQuery?.id) {
    return null;
  }

  if (fetching) {
    <div className="fadein" key={bardContextValue.activeUserQuery.description}>
      Loading
    </div>;
  }

  return (
    <div
      className="responseWindow fadein"
      key={bardContextValue.activeUserQuery.description}
    >
      <div className="question">
        <AccountCircleIcon />
        <div className="activeQueryQuestion">
          {bardContextValue.activeUserQuery.description}
        </div>
      </div>
      <div className="qResponse">
        <div>
          <img
            _ngcontent-ng-c3877805786=""
            alt="bard-cpy-img"
            src="https://www.gstatic.com/lamda/images/sparkle_resting_v2_1ff6f6a71f2d298b1a31.gif"
            width={30}
            height={30}
          />
        </div>
        <div className="activeResponse">
          {bardContextValue.activeUserQuery?.mockResponse ? (
            bardContextValue.activeUserQuery.mockResponse
          ) : (
            <Markdown>{d1}</Markdown>
          )}
        </div>
      </div>
    </div>
  );
};
