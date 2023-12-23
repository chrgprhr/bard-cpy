import "./App.css";
import { Header } from "./Header";
import { BardViewContextProvider } from "./BardViewContext";
import { Menu } from "./Menu";
import { NewChatView } from "./NewChatView";

const View = () => {
  // const { bardContextValue } = useBardContext();
  return (
    <>
      <Header />
      <div className="content">
        <Menu />
        <NewChatView />
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BardViewContextProvider>
        <View />
      </BardViewContextProvider>
    </div>
  );
}

export default App;
