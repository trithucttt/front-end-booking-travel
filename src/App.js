import styles from "./App.module.css";
import Footer from "./share/Footer/Footer";
import Routess from "./routers/Routess";
import Nav from "./share/Header/Nav";
import { Provider } from "react-redux";
import store from "./reduxProvider/store";
function App() {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <Nav />
        <div className={styles.content}>
          <Routess />
        </div>
        {/* <footer>
          <Footer />
        </footer> */}
      </div>
    </Provider>
  );
}

export default App;
