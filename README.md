# Adverity Challenge

## Running Locally

With yarn installed:

```
yarn
yarn start
```

You should see a screen that looks like the `no-filters.png` file in this repo.

## Testing

```
yarn test
```

## External libraries and why

- Chakra UI: To easily lay out the site without needing CSS files
- React Query: Adds all of the peripherals around fetching remote data
- Papa Parse: Fetch and parse the CSV file
- Recharts: showing a chart from the relevant data

## Overview

I have created a dashboard that uses the CSV data provided and displays a graph
that can be filtered by Datasource or Campaign. papaparse is used to get the CSV
data and read it into a list of dictionaries. From there, I reduce the relevant
data and sum it per day while filtering any active filters. This data time
series is then shown on a Recharts line plot. I opted to no use an "Apply"
button and just have the graph automatically update when the filters change.

I chose to use Chakra UI and React Query out of comfort even though they are a
bit overkill for such a tiny app. I see Chakra UI's theming as its main
advantage and I didn't focus on UI (as it was requested not to). In addition,
the theming is also very powerful when you would like to reuse components and
this is just a one off implementation. React Query takes care of all of the
chores around fetching and caching data and is only used in a limited capacity
since we only are fetching one thing.

## Improvements

Testing could be much more detailed to cover more cases and check that the data
is filtered correctly. Also, I'm a big fan of storybook and doing visual diffs
but I didn't have time to get into that. I open sourced a color trivia game that
I've been toying with a bit here: https://github.com/nicolls1/color-game and it
uses Storybook.
