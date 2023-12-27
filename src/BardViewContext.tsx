import { v4 as uuidv4 } from "uuid";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const mobileViewWidthBreakpoint = 600;

export interface IUserQuery {
  id?: string;
  label: string;
  description: string;
  tags?: string[];
  mockResponse?: string;
}

export interface BardContextValueInterface {
  isMenuOpen: boolean;
  isMobileView: boolean;
  activeUserQuery?: IUserQuery;
  recentUserQueries: IUserQuery[];
  newChatWindowOpen: boolean;
  userQueryResponse?: {
    ok: boolean;
    data: any;
    fetching: boolean;
    error: string;
  };
}

interface IBardContextProps {
  bardContextValue: BardContextValueInterface;
  setBardContextValue: Dispatch<SetStateAction<BardContextValueInterface>>;
  updateRecentQueryList: (q: string) => void;
  handleQuerySubmission: (q: string) => void;
}

export const BardViewContext = createContext<IBardContextProps>(
  {} as IBardContextProps
);

export const BardViewContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const initialValues: BardContextValueInterface = {
    isMenuOpen: false,
    isMobileView: !!(window.innerWidth < mobileViewWidthBreakpoint),
    recentUserQueries: [],
    newChatWindowOpen: true,
  };

  const [bardContextValue, setBardContextValue] =
    useState<BardContextValueInterface>(initialValues);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setBardContextValue({
        ...bardContextValue,
        isMobileView: !!(window.innerWidth < mobileViewWidthBreakpoint),
      })
    );
    // eslint-disable-next-line
  }, []);

  const updateRecentQueryList = useCallback(
    // list to be updated when user clicks on "send" query button
    (incomingUserInputQuery: string) => {
      if (bardContextValue.recentUserQueries.length) {
        // Existing recent queries exist
        let activeQueryMatch = false;
        const clone = bardContextValue.recentUserQueries.map((ruq) => {
          if (
            ruq.id &&
            bardContextValue.activeUserQuery?.id &&
            ruq.id === bardContextValue.activeUserQuery.id
          ) {
            ruq.description = incomingUserInputQuery;
            activeQueryMatch = true;
            return ruq;
          }
          return ruq;
        });
        if (activeQueryMatch) {
          // user has typed after selecting a prompt tile
          // Updated the dscription and set
          setBardContextValue({
            ...bardContextValue,
            newChatWindowOpen: false,
            recentUserQueries: clone,
          });
        } else if (bardContextValue.activeUserQuery) {
          // user has just selected a prompt tile
          // Append the latest selection at the top of recent queries
          const newActiveQueryWithId = {
            ...bardContextValue.activeUserQuery,
            id: uuidv4(),
          };
          const newArray = [newActiveQueryWithId, ...clone];
          setBardContextValue({
            ...bardContextValue,
            newChatWindowOpen: false,
            recentUserQueries: newArray,
            activeUserQuery: newActiveQueryWithId,
          });
        }
      } else {
        // Recent user queries are empty
        if (bardContextValue.activeUserQuery) {
          // user has selected a prompt tile
          // create a fresh array and set
          const newActiveQueryWithId = {
            ...bardContextValue.activeUserQuery,
            id: uuidv4(),
          };
          setBardContextValue({
            ...bardContextValue,
            newChatWindowOpen: false,
            recentUserQueries: [newActiveQueryWithId],
            activeUserQuery: newActiveQueryWithId,
          });
        } else {
          // user is simply typing a fresh query without selecting any prompt tile
          // set the attributes and update the array
          const fresh: IUserQuery = {
            id: uuidv4(),
            label: incomingUserInputQuery,
            description: incomingUserInputQuery,
            tags: [incomingUserInputQuery],
          };
          setBardContextValue({
            ...bardContextValue,
            newChatWindowOpen: false,
            recentUserQueries: [fresh],
            activeUserQuery: fresh,
          });
        }
      }
    },
    [bardContextValue, setBardContextValue]
  );

  // const prepareResponse = useCallback(() => {
  //   setBardContextValue({
  //     ...bardContextValue,
  //     recentUserQueries: bardContextValue.recentUserQueries,
  //     userQueryResponse: {
  //       ok: false,
  //       fetching: true,
  //       data: null,
  //       error: "",
  //     },
  //   });

  //   // mock fetch or two seconds

  //   // setTimeout(() => {
  //   //   // do nothing
  //   // }, 2000);

  //   setBardContextValue({
  //     ...bardContextValue,
  //     recentUserQueries: bardContextValue.recentUserQueries,
  //     userQueryResponse: {
  //       ok: true,
  //       fetching: false,
  //       data: bardContextValue.activeUserQuery?.mockResponse,
  //       error: "",
  //     },
  //   });
  // }, [setBardContextValue, bardContextValue]);

  const handleQuerySubmission = useCallback(
    (incomingQuery: string) => {
      updateRecentQueryList(incomingQuery);
    },
    [updateRecentQueryList]
  );

  return (
    <BardViewContext.Provider
      value={{
        bardContextValue,
        setBardContextValue,
        updateRecentQueryList,
        handleQuerySubmission,
      }}
    >
      {children}
    </BardViewContext.Provider>
  );
};

export const useBardContext = () => {
  const context = useContext(BardViewContext);
  if (context === undefined) {
    throw new Error(`Error: context missing`);
  }
  return context;
};
