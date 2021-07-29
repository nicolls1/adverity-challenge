import Papa from 'papaparse'
import { useQuery } from 'react-query'
import { AdvertisingEntry } from '../types/metrics'

export const useAdvertisingData = (dataUrl: string) =>
  useQuery<AdvertisingEntry[]>('advertisingData', async () => {
    return await new Promise<AdvertisingEntry[]>((resolve, reject) => {
      Papa.parse<AdvertisingEntry>(dataUrl, {
        download: true,
        header: true,
        trimHeaders: true,
        skipEmptyLines: true,
        complete: ({ data, errors }) =>
          errors.length > 0
            ? reject(errors)
            : resolve(
                data.map((entry) => ({
                  ...entry,
                  Clicks: Number(entry.Clicks),
                  Impressions: Number(entry.Impressions),
                }))
              ),
      })
    })
  })
