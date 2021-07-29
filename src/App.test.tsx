import { render, screen } from '@testing-library/react'
import AdvertisingDataGraph from 'components/AdvertisingDataGraph/AdvertisingDataGraph'

const TEST_DATA = [
  {
    Date: '01.01.2021',
    Datasource: 'd1',
    Campaign: 'c1',
    Clicks: 1,
    Impressions: 10,
  },
  {
    Date: '01.01.2021',
    Datasource: 'd1',
    Campaign: 'c1',
    Clicks: 1,
    Impressions: 10,
  },
  {
    Date: '02.01.2021',
    Datasource: 'd2',
    Campaign: 'c2',
    Clicks: 2,
    Impressions: 11,
  },
  {
    Date: '02.01.2021',
    Datasource: 'd2',
    Campaign: 'c2',
    Clicks: 2,
    Impressions: 11,
  },
]

test('renders AdvertisingDataGraph empty list input', () => {
  render(<AdvertisingDataGraph advertisingData={[]} />)
  const linkElement = screen.getByText(/No data found/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders AdvertisingDataGraph', () => {
  render(<AdvertisingDataGraph advertisingData={TEST_DATA} />)
  const linkElement = screen.getByText(/Filter dimension values/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders AdvertisingDataGraph datasource filter', () => {
  render(
    <AdvertisingDataGraph
      advertisingData={TEST_DATA}
      initialState={{ activeDatasources: ['d1'] }}
    />
  )
  const linkElement = screen.getByText(/d1/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders AdvertisingDataGraph campaign filter', () => {
  render(
    <AdvertisingDataGraph
      advertisingData={TEST_DATA}
      initialState={{ activeDatasources: ['c1'] }}
    />
  )
  const linkElement = screen.getByText(/c1/i)
  expect(linkElement).toBeInTheDocument()
})
