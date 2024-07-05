const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const { API_BASE_URL } = process.env;
const { API_KEY_VALUE } = process.env;
const API_SERVICE_URL = `${API_BASE_URL}?q=Egypt&key=${API_KEY_VALUE}`;

// Logging the requests
app.use(morgan("dev"));

// Proxy Logic :  Proxy endpoints
app.use(
	"/v1",
	createProxyMiddleware({
		target: API_SERVICE_URL,
		changeOrigin: true,
	})
);

// Starting our Proxy server
app.listen(PORT, HOST, () => {
	console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
