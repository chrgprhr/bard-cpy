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

export interface BardContextValueInterface {
  isMenuOpen: boolean;
  isMobileView: boolean;
  prefillInputText?: string;
  recentUserQueries: string[];
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
  }, [bardContextValue]);

  const updateRecentQueryList = useCallback(
    (incomingQuery: string) => {
      const existing = bardContextValue.recentUserQueries;
      const updated = [incomingQuery, ...existing];
      const updatedSet = [...Array.from(new Set(updated))];
      setBardContextValue({
        ...bardContextValue,
        newChatWindowOpen: false,
        recentUserQueries: updatedSet,
        prefillInputText: incomingQuery,
      });
    },
    [bardContextValue, setBardContextValue]
  );

  return (
    <BardViewContext.Provider
      value={{ bardContextValue, setBardContextValue, updateRecentQueryList }}
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
