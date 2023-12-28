import { useBardContext } from "./BardViewContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "./Response.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { d1 } from "./demoResponses";
import Button from "@mui/material-next/Button";

const NoResponse = () => {
  return (
    <div>
      Unfortunately, the query is quite ambiguous and could refer to several
      things. To give you the most relevant response, I need some additional
      context. Could you please provide more information about what you're
      interested in?
    </div>
  );
};

const ActiveQueryEditMode = ({
  onCancel,
  onUpdate,
}: {
  onCancel: () => void;
  onUpdate: (us: string) => void;
}) => {
  const { bardContextValue } = useBardContext();

  const [activeEditedQuery, setActiveEditedQuery] = useState(
    bardContextValue.activeUserQuery?.description
  );
  const [edited, setEdited] = useState(false);
  const activeQueryEditInputRef = useRef(null);

  const handleActiveQueryEditChange = useCallback(
    (e: any) => {
      setActiveEditedQuery(e.target.value);
      setEdited(true);
    },
    [setActiveEditedQuery]
  );

  useEffect(() => {
    // @ts-ignore
    activeQueryEditInputRef.current?.focus();

    // eslint-disable-next-line
  }, []);

  const onCancelEditModeClick = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const onUpdateQueryEdit = () => {
    onUpdate(activeEditedQuery || "");
  };

  return (
    <div className="activeQueryEditMode">
      <input
        value={activeEditedQuery}
        onChange={handleActiveQueryEditChange}
        className="activeEditedQueryInput"
        ref={activeQueryEditInputRef}
      />

      <div className="activeQueryEditModeActions">
        <Button
          variant="text"
          className="cancelBtn"
          onClick={onCancelEditModeClick}
        >
          Cancel
        </Button>
        <Button
          onClick={onUpdateQueryEdit}
          variant="filled"
          className="updateBtn"
          disabled={!edited}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export const Response = () => {
  const { bardContextValue, setBardContextValue } = useBardContext();
  const [activeQueryEditMode, setActiveQueryEditMode] = useState(false);

  const onActiveQueryEditClick = useCallback(() => {
    setActiveQueryEditMode(true);
  }, [setActiveQueryEditMode]);

  if (!bardContextValue.activeUserQuery?.id) {
    return null;
  }

  const cancelActiveQueryMode = () => {
    setActiveQueryEditMode(false);
  };

  const onActiveQueryUpdate = (updatedquery: string) => {
    if (updatedquery) {
      setBardContextValue({
        ...bardContextValue,
        activeUserQuery: {
          ...bardContextValue.activeUserQuery,
          label: bardContextValue.activeUserQuery?.label || "",
          description: updatedquery,
          mockNoResponse: false,
          mockResponse: "This is how ideally things should work",
        },
      });
      setActiveQueryEditMode(false);
    }
  };

  return (
    <div
      className="responseWindow fadein"
      key={bardContextValue.activeUserQuery.description}
    >
      <div className="question">
        <AccountCircleIcon />
        {activeQueryEditMode ? (
          <ActiveQueryEditMode
            onCancel={cancelActiveQueryMode}
            onUpdate={onActiveQueryUpdate}
          />
        ) : (
          <div className="activeQueryQuestion">
            {bardContextValue.activeUserQuery.description}
            {bardContextValue.activeUserQuery.mockNoResponse ? (
              <div
                className="activeQueryQuestionEdit cursor-pointer"
                onClick={onActiveQueryEditClick}
              >
                <EditOutlinedIcon />
              </div>
            ) : null}
          </div>
        )}
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
          ) : bardContextValue.activeUserQuery.mockNoResponse ? (
            <NoResponse />
          ) : (
            <Markdown>{d1}</Markdown>
          )}
        </div>
      </div>
    </div>
  );
};
