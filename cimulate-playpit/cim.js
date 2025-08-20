import { CimulateSearchClient } from '@cimulate/search-sdk';
import { SearchRequest } from '@cimulate/search-sdk';

// Initialize with API key or token
const client = new CimulateSearchClient({
  apiKey: 'your-api-key-here',
  // OR token: 'your-bearer-token',
  baseURL: 'https://prod.search.cimulate.ai/api/v1',
  options: {
    maxRetries: 5,        // Default: 3
    baseDelay: 500,       // Default: 300ms
    timeout: 30000,       // Default: 10000ms
    enableLogging: true   // Default: false
  }
});

// Connect and verify API credentials
await client.connect();
const version = await client.getVersion();
console.log(`API Version: ${version.version}`);

// Perform a search
const results = await client.search({ query: 'running shoes' });
console.log(`Found ${results.total_hits} products`);
