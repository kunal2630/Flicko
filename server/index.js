const express = require("express");
const app = express();
const cors = require("cors")
const { PORT, MONGO_URI } = require("./config/server.config");
const connectDB = require("./config/database.config");
const apiRoutes = require("./routes");
const errorMiddleware = require("./middleware/error.middleware");

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use(errorMiddleware);

const start = async () => {
	try {
		await connectDB(MONGO_URI);
		app.listen(PORT, () => {
			console.log(`Server is listening on ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};
start();


