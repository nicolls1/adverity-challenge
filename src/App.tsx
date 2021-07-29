import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import { CircularProgress } from '@chakra-ui/progress'

import AdvertisingDataGraph from 'components/AdvertisingDataGraph/AdvertisingDataGraph'
import { useAdvertisingData } from 'hooks/metrics'

const App: React.FC = () => {
  const { data, isLoading, isError } = useAdvertisingData(
    'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv'
  )

  return (
    <Flex direction="column" w="100vw" minH="100vh">
      <Stack direction="column" spacing={5} p={5}>
        <Heading>Advertity Advertising Data ETL-V Challenge</Heading>
        <Flex direction="column">
          <Text>- Select zero to N Datasources</Text>
          <Text>- Select zero to N Campaigns</Text>
          <Text fontSize="xs">(where zero means "All")</Text>
        </Flex>
        <Text>
          Selecting filters in the dropdowns will filter the chart to show a
          timeseries for both <i>Clicks</i> and <i>Impressions</i> for given{' '}
          <i>Datasources</i> and <i>Campaigns</i> - logical AND
        </Text>
      </Stack>
      <Box flexGrow={1} display="flex">
        {isLoading ? (
          <Center w="full">
            <CircularProgress isIndeterminate />
          </Center>
        ) : !data || isError ? (
          <Center w="full">
            <Text>Failed to get advertising data</Text>
          </Center>
        ) : (
          <AdvertisingDataGraph advertisingData={data} />
        )}
      </Box>
    </Flex>
  )
}

export default App
