
Cryptocurrency Dashboard
A modern web application for tracking and managing cryptocurrencies, built with React and Vite. This app fetches real-time data from the CoinGecko API, offering users a seamless experience to visualize market trends, manage a portfolio, and simulate coin exchanges. Designed to be responsive, error-resilient, and deployed on Vercel, it ensures a smooth user experience with innovative features.

Functionalities
Base Currency Switch: Switch between USD, INR, or EUR via the header dropdown. Updates prices, market caps, and charts dynamically in the chosen currency.
Search Bar: Search for a specific cryptocurrency (e.g., "bitcoin") to display its data on the chart.
Multi-Crypto Selection and Comparison: Select multiple cryptos using a searchable dropdown (react-select) to compare price trends in the main chart.
Chart Visualization: Displays monthly price data over 6 months. Switch between line, bar, or horizontal bar types with legends, tooltips, and distinct colors for each coin.
Market Cap Sidebar: Lists the top 10 cryptocurrencies by market cap, showing name, value in base currency, and 24h change % (green for up, red for down). Scrollable with alternating rows.
Portfolio Pie Chart: Visualizes portfolio holdings with colored slices, updating dynamically on exchanges.
Coin Exchange Form: Simulates buying/selling coins. Select sell/buy coins, enter an amount—auto-calculates based on prices, validates input, and updates the portfolio/pie chart without refreshing.
Error and Loading Handling: Displays a loading spinner during fetches and error messages with a reload option. Includes retries for rate limits.
Usage
Switch currencies in the header.
Search or select multiple coins to view in the chart.
Check market cap details on the right sidebar.
Use the exchange form: Select sell/buy coins, enter an amount, click "Exchange" to see pie updates.
Out-of-the-Box Idea
To ensure smooth performance despite network hiccups (e.g., CORS or rate limits), I implemented an auto-refresh feature that updates data every 13 seconds. This keeps the dashboard current without manual reloads, enhancing user experience.

Deployment
Live at: https://crypto-dashboard-yi1w-git-main-anubhab-dashs-projects.vercel.app

Import the GitHub repo into the Vercel dashboard.
Select the Vite framework.
Build command: vite build
Output directory: dist
Technologies
Frontend: React, Vite (build tool)
State Management: Redux, redux-thunk
Styles: TailwindCSS
Charts: Chart.js, react-chartjs-2
API: CoinGecko (with proxy for CORS)
Others: Axios (fetches), react-select (dropdowns), date-fns (dates), lodash (debounce)
Installation
Clone the repo:
text
git clone //https://github.com/Anubhab-del/Crypto-dashboard.git
cd crypto-dashboard
Install dependencies:
text
npm install
Run locally:
text
npm run dev
Opens at http://localhost:5173.
Known Issues & Fixes
Network Errors: Handled with retries and backoff in services.
Rate Limits: Caching added—auto-refresh every 13 seconds mitigates persistence.

Contact
Questions or feedback? Open an issue on GitHub or reach out at anubhab0211@gmail.com.

Hope you like it! Thank you.
