import { precacheAndRoute } from 'workbox-precaching'
import { Prefetcher } from '@layer0/prefetch/sw'
import DeepFetchPlugin from '@layer0/prefetch/sw/DeepFetchPlugin'
import { getOptimizedImageUrl } from '../lib/cms'

precacheAndRoute([])

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      // query the PLP API response for images to prefetch
      {
        jsonQuery: 'picture:picture',
        jsonQueryOptions: {
          locals: {
            picture: input => {
              if (input.map) {
                return input.map(getOptimizedImageUrl)
              }

              return []
            },
          },
        },
        maxMatches: 10,
        as: 'image',
      },
    ]),
  ],
}).route()
