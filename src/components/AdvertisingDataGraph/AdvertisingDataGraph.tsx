import { useMemo, useState } from 'react'
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import Select, { createFilter } from 'react-select'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { AdvertisingEntry } from 'types/metrics'

interface Props {
  advertisingData: AdvertisingEntry[]
  initialState?: {
    activeDatasources?: string[]
    activeCampaigns?: string[]
  }
}

const AdvertisingDataGraph: React.FC<Props> = ({
  advertisingData,
  initialState,
}) => {
  const datasources = useMemo(
    () =>
      advertisingData && [
        ...new Set(advertisingData.map((entry) => entry.Datasource)),
      ],
    [advertisingData]
  )
  const campaigns = useMemo(
    () =>
      advertisingData && [
        ...new Set(advertisingData.map((entry) => entry.Campaign)),
      ],
    [advertisingData]
  )

  const [activeDatasources, setActiveDatasources] = useState<string[]>(
    initialState?.activeDatasources || []
  )
  const [activeCampaigns, setActiveCampaigns] = useState<string[]>(
    initialState?.activeCampaigns || []
  )

  // Sum data for all or selected Datasources or Campaigns
  const graphData = useMemo(() => {
    const dateSums = advertisingData.reduce((previousValue, currentValue) => {
      if (
        (activeCampaigns.length > 0 &&
          !activeCampaigns.includes(currentValue.Campaign)) ||
        (activeDatasources.length > 0 &&
          !activeDatasources.includes(currentValue.Datasource))
      ) {
        return previousValue
      }
      return currentValue.Date in previousValue
        ? {
            ...previousValue,
            [currentValue.Date]: {
              Impressions:
                currentValue.Impressions +
                previousValue[currentValue.Date].Impressions,
              Clicks:
                currentValue.Clicks + previousValue[currentValue.Date].Clicks,
            },
          }
        : {
            ...previousValue,
            [currentValue.Date]: {
              Impressions: currentValue.Impressions,
              Clicks: currentValue.Clicks,
            },
          }
    }, {} as Record<string, { Clicks: number; Impressions: number }>)

    return Object.keys(dateSums).map((dateKey) => {
      return {
        Date: dateKey,
        Clicks: dateSums[dateKey].Clicks,
        Impressions: dateSums[dateKey].Impressions,
      }
    })
  }, [advertisingData, activeDatasources, activeCampaigns])

  return (
    <Flex direction="row" w="full">
      <Stack
        direction="column"
        minW={'lg'}
        spacing={5}
        bgColor="blue.100"
        p={5}
      >
        <Heading size="md">Filter dimension values</Heading>
        <Text fontWeight="bold">Datasource</Text>
        <Select
          options={datasources?.map((datasource) => ({
            value: datasource,
            label: datasource,
          }))}
          placeholder="All"
          isMulti
          onChange={(selected) =>
            setActiveDatasources(selected.map((option) => option.value))
          }
          value={activeDatasources?.map((datasource) => ({
            label: datasource,
            value: datasource,
          }))}
        />
        <Text fontWeight="bold">Campaign</Text>
        <Select
          options={campaigns?.map((campaign) => ({
            value: campaign,
            label: campaign,
          }))}
          placeholder="All"
          isMulti
          onChange={(selected) =>
            setActiveCampaigns(selected.map((option) => option.value))
          }
          value={activeCampaigns?.map((campaign) => ({
            label: campaign,
            value: campaign,
          }))}
          // recoomended here: https://github.com/JedWatson/react-select/issues/3128 and seems to make the dropdown less choppy
          filterOption={createFilter({ ignoreAccents: false })}
        />
      </Stack>
      <Box flexGrow={1}>
        {graphData.length === 0 ? (
          <Center h="full">
            <Text>No data found</Text>
          </Center>
        ) : (
          <ResponsiveContainer
            width="100%"
            minWidth={100}
            height="100%"
            minHeight={100}
          >
            <LineChart
              width={500}
              height={300}
              data={graphData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="Date"
                tickFormatter={(timestamp) => {
                  if (!timestamp) {
                    return ''
                  }
                  const splitTime = timestamp.split('.')
                  return new Date(
                    splitTime[2],
                    splitTime[1] - 1,
                    splitTime[0]
                  ).toLocaleDateString('en-EN', {
                    month: 'short',
                    day: 'numeric',
                  })
                }}
              />
              <YAxis
                yAxisId="left"
                label={{
                  value: 'Clicks',
                  angle: -90,
                  position: 'left',
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: 'Impressions',
                  angle: 90,
                  position: 'right',
                }}
                tickFormatter={(count) => {
                  if (count < 1000) {
                    return count
                  }
                  return Math.floor(count / 1000) + 'k'
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Clicks"
                stroke="#8884d8"
                dot={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Impressions"
                stroke="#82ca9d"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Flex>
  )
}

export default AdvertisingDataGraph
