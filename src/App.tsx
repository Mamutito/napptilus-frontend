import { StoreProvider } from "./context/StoreContext";
import AppRouter from "./routes/AppRoute";

function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
