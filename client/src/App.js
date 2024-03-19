import "./App.css";
import Browse from "./components/Browse";
import Error from "./components/Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import appstore, { persistor } from "./utils/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Landingpage from "./components/Landingpage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
	return (
		<Provider store={appstore}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<Routes>
						<Route path="/" element={<Landingpage />} />

						<Route element={<PrivateRoute />}>
							<Route path="/browse" element={<Browse />} />
						</Route>

						<Route path="*" element={<Error />} />
					</Routes>
				</Router>
			</PersistGate>
		</Provider>
	);
};

export default App;
