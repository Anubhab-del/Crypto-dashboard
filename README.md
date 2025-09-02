Cryptocurrency Dashboard
A modern web application for tracking and managing cryptocurrencies, built with React and Vite. It fetches real-time data from the CoinGecko API, allows users to visualize market trends, manage a portfolio, and simulate coin exchanges. The app is responsive, error-resilient, and deployed on Vercel.
Functionalities

Base Currency Switch: Select from USD, INR, or EUR in the header dropdown. Switches update all prices, market caps, and charts in the chosen currency.
Search Bar: Search for a specific cryptocurrency by name (e.g., "bitcoin"). Updates the chart to show data for the searched coin.
Multi-Crypto Selection and Comparison: Use the dropdown to select multiple cryptos (searchable with react-select). Compares their price data in the main chart.
Chart Visualization: Main chart shows monthly price data over 6 months. Switch between line, bar, or horizontal bar types. Legends, tooltips, and colors for each coin.
Market Cap Sidebar: Lists top 10 cryptos by market cap, with name, value in base currency, and 24h change % (green up, red down). Scrollable with alternating rows for readability.
Portfolio Pie Chart: Visualizes user portfolio holdings with colored slices. Updates dynamically on exchanges.
Coin Exchange Form: Simulate buying/selling coins. Select sell/buy coin, enter amount—auto-calculates based on prices. Validates input, shows errors. On exchange, updates portfolio and pie chart (no page refresh).
Error and Loading Handling: Shows loading spinner during fetches, error messages on network issues (with reload button). Retries on rate limits.

Usage

Switch currency in header.
Search or select multiple coins for chart.
View market cap list on right.
In exchange: Select sell/buy, enter amount, click Exchange—see pie update


Deployment
Deployed on Vercel:
https://crypto-dashboard-yi1w-git-main-anubhab-dashs-projects.vercel.app?_vercel_share=kghqzRWUsmRWQxRk8byUqPER8TjVG4r3

Import GitHub repo in Vercel dashboard.
Select Vite framework.
Build command: vite build
Output: dist

Technologies

Frontend: React, Vite (build tool)
State Management: Redux, redux-thunk
Styles: TailwindCSS
Charts: Chart.js, react-chartjs-2
API: CoinGecko (with proxy for CORS)
Others: Axios (fetches), react-select (dropdowns), date-fns (dates), lodash (debounce)

Known Issues & Fixes

Network errors: Handled with retries/backoff in services.
Rate limits: Caching added—refresh if persistent.
For smooth use: Try responding to it every 13 seconds
It works smoothly. A new out of box idea i had applied very closely to the project.
Hope you Like it
Thank You.
