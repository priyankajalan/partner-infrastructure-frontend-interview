# Holidu frontend developer interview assignment

Hi there! Congratulations on making it to the next step!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is using [Material-UI](https://material-ui.com/) and [Recharts](http://recharts.org/) to save you some time.


Your task is to fetch the data from the mock API at `/api/people.json`, for example http://localhost:3000/api/people.json, and make it usable in the dashboard.


The following functionality should be implemented:

* Filter and sort the Scores Listing by any of the shown attributes, such as first name, last name, or country
* Show the average score of the people in the data set grouped by country in a suitable visualization
* Show the average score of the people in the data set grouped by gender in a suitable visualization

Some tests for the implemented functionality would be nice, too. 😉


If you have any questions, please send an email to your HR contact at Holidu.

Good luck and happy coding!

## Assignment Solution - by Priyanka

First words, loved the assignment. I got a small chance to work on Charts which I have not worked on before at work. The assignment was straight forward and I have enjoyed working on it. 

### What I have done

To achieve the three functionalities, here is my approach:

* **Filter and sort the Scores Listing by any of the shown attributes, such as first name, last name, or country**

The Component `<ScoreTable />` displays the available people data fetched from the api `/api/people.json` by `<Dashboard />` Component. Pagination is added for the table.

**First Name, Last Name, City, Country, Score** Columns can be sorted **ascending or descending** by clicking on the **Arrows** beside column header.

The list of data can be filtered by entering query in the `TextField` and it will only search for the selected column as shown in the **Dropdown Menu**. The selected search column can be changed by choosing a column from the list of available columns in the Dropdown menu.

* **Show the average score of the people in the data set grouped by country in a suitable visualization**

The Component `<CountryBarChart />` displays the **BarChart** by calculating the average score grouped by a particular country.

The Parent Component `<CountryCharts />` has a Dropdown for **Continent** selection. Since there are 117 Countries in the list for better visualization, I have segregated them based on 6 Continents (excluding Antarctica - since there was no data provided for Antarctica). 

Continent can be selected from the Dropdown menu and the BarChart of the average score for available countries of that Continent will be displayed.

* **Show the average score of the people in the data set grouped by gender in a suitable visualization**

The Component `<GenderChart />` displays the **PieChart** by calculating the percentage of scores grouped by male and female for all countries.

There are three routes created to navigate through different views: 
* `/` : Dashboard
* `/country-charts`: Scores by country
* `/gender-charts`: Scores by gender

### Unit Testing
Few Basic test cases are written for the implemented following Components

```
<ScoreTable />
<GenderChart />
<CountryCharts />
<CountryBarChart />
<Title />
```

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test` or `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject` or `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
