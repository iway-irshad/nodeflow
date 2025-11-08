import {
    defaultShouldDehydrateQuery,
    QueryClient,
  } from '@tanstack/react-query';
import superjson from 'superjson';
  
  /**
   * Create a QueryClient configured with sensible defaults for caching and (de)hydration.
   *
   * Configurations include a 30,000 ms query staleTime, use of `superjson` for serialize/deserialize
   * during dehydrate/hydrate, and a `shouldDehydrateQuery` that dehydrates queries when the default
   * criteria are met or when a query's state is `pending`.
   *
   * @returns A configured `QueryClient` instance.
   */
  export function makeQueryClient() {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 1000,
        },
        dehydrate: {
          serializeData: superjson.serialize,
          shouldDehydrateQuery: (query) =>
            defaultShouldDehydrateQuery(query) ||
            query.state.status === 'pending',
        },
        hydrate: {
          deserializeData: superjson.deserialize,
        },
      },
    });
  }