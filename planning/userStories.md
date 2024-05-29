# User Stories

- As a user, I have the ability to create an account.
- As a user, I must log in and out to use the app.
- As a user, I can search for any stock that is listed publicly and retrieve an analysis of:
  * Intrinsic value
  * Current price
  * P/E ratio
  * EPS
  * Dividend yield
  * Dividend per share
  * Dynamic Graphs (option to see data table)
- As a user, I can set how long the future value should be in the analysis retrieval that I requested. (STRETCH)
- As a user, I can add a stock to my watchlist so that I can obtain data in a timely manner.
- As a user, I can delete a stock from my watchlist.
- As a user, I can create a custom category within my watchlist to assist in organization and timing. (STRETCH)
- As a user, I can add a stock to a custom category.
- As a user, I can delete a created category.
- As a user, I can select a watchlist/categorized stock and view an analysis of:
  * Intrinsic value
  * Market value
  * P/E ratio
  * EPS
  * Dividend yield
  * Dividend per share
  * Dynamic Graphs (option to see data table)

## STRETCH FEATURE

- As a user, I can manage a portfolio list so that I can reflect on my investment(s) in a timely manner.
- As a user, I can create categories for my portfolio list to assist in organization and timing.
- As a user, I can add portfolio stocks to a custom category.
- As a user, I can select a portfolio/categorized stock and view an analysis of:
  * Intrinsic value
  * Market value
  * Return on Equity – inflation rate can be adjusted and accounted for
  * P/E ratio
  * Historical performance
  * Profit

# Developer/Admin Stories

- As a developer, I must ensure that the user's information is secure.
- As a developer, I must include clear disclaimers to limit liability.
- As a developer, I must optimize the app for mobile and desktop. (STRETCH)

# User Stories Acceptance Criteria

- As a user, I have the ability to create an account:
  - The user can access the registration page.
  - The user can enter their email address and password to create an account.
  - The system verifies that the email address is unique.

- As a user, I must log in and out to use the app:
  - The user can access the login page.
  - The user can enter their email address and password to log in.
  - Upon successful login, the user is redirected to the dashboard.
  - The user can log out from any page within the app.
  - The system securely stores user credentials and authenticates users during login.

- As a user, I can search for any stock that is listed publicly and retrieve an analysis of:
  - The user can enter a stock symbol in the search bar.
  - The system retrieves data for publicly listed stocks matching the entered symbol.
  - The system displays the intrinsic value, market value, P/E ratio, EPS, and dividend yield of the selected stock.
  - If the stock symbol is invalid or not found, the system displays an appropriate error message.

## STRETCH

- As a user, I can set how long the future value should be in the analysis retrieval that I requested:
  - The user can specify a time frame for future value analysis, such as 1 month, 3 months, 6 months, or 1 year.

- As a user, I can add a stock to my watchlist so that I can obtain data in a timely manner:
  - The user can add a stock to the watchlist by clicking the "Add to Watchlist" button.
  - The system adds the selected stock to the user's watchlist.
  - The watchlist updates to display the newly added stock with its basic information.

- As a user, I can delete a stock from my watchlist:
  - The user can remove a stock from the watchlist by clicking the "Delete" or "Remove" button next to the stock.
  - The system removes the selected stock from the user's watchlist.

- As a user, I can create a custom category within my watchlist to assist in organization and timing:
  - The user can create a custom category by entering a name for the category and clicking the "Create" button.
  - The system adds the newly created category to the user's watchlist.

- As a user, I can add a stock to a custom category:
  - The user can select a stock from the watchlist and assign it to a custom category from a dropdown menu.
  - The system updates the stock's category accordingly.

- As a user, I can delete a created category:
  - The user can delete a custom category by clicking the "Delete" or "Remove" button next to the category.
  - The system removes the selected category and all associated stocks from the user's watchlist and redirects them to the main watchlist dashboard OR category deletion is not possible unless the directory is empty.

- As a user, I can select a watchlist/categorized stock and view an analysis of:
  - The user can select a stock or category from the watchlist.
  - The system displays the intrinsic value, market value, and additional analysis metrics for the selected stock or category.

- As a user, I can manage an active list so that I can reflect on my investment(s) in a timely manner:
  - The user can access the active list management page.
  - The user can view and update the list of active investments.

- As a user, I can create categories for my active list to assist in organization and timing:
  - The user can create a custom category for active investments.
  - The system adds the newly created category to the active list.

- As a user, I can add active stocks to a custom category:
  - The user can assign active stocks to a custom category from a dropdown menu.
  - The system updates the stock's category accordingly.

- As a user, I can select an active/categorized stock and view an analysis of:
  - The user can select an active stock or category from the active list.
  - The system displays comprehensive analysis metrics, including intrinsic value, market value, return on equity, P/E ratio, and historical performance.

# Developer/Admin Stories Acceptance Criteria

- As a developer, I must ensure that the user's information is secure:
  - The system follows best practices for authentication and authorization, including password hashing and secure session management.

- As a developer, I must include clear disclaimers to limit liability:
  - The app displays clear disclaimers regarding the nature of financial advice provided and the risks associated with investing.
  - The disclaimers are prominently displayed during account creation, login, and on data analysis pages.

- As a developer, I must optimize the app for mobile and desktop:
  - The app's interface is responsive and optimized for various screen sizes, including mobile devices and desktop computers.
  - The app's performance is optimized for fast loading times and smooth navigation on both mobile and desktop platforms.
