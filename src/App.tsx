import CartProvider from './context/cartContext';
import { UserProvider } from './context/userContext';
import Router from './routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <GlobalStyles />

    <UserProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </UserProvider>
  </>
);

export default App;
