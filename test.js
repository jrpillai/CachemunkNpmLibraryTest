import dotenv from 'dotenv';
dotenv.config();

import cache from './redisClient.js';

async function testCache() {
    try {
        console.log('\n====================');
        console.log('Testing cache.set and cache.get');
        console.log('====================\n');
        
        // Call the set function with a queryKey, data, and an array of dependencies
        await cache.set('testKey', 'testValue', []);

        // Call the get function to retrieve the cached value
        let value = await cache.get('testKey');
        console.log("\ntestKey:", value); // Should print 'testValue'

        console.log('\n====================');
        console.log('Testing cache.invalidate');
        console.log('====================\n');

        // Call the set function with a queryKey, data, and an array of dependencies
        await cache.set('testKey2', 'testValue to be invalidated', ['testDependency']);

        // Call the get function to retrieve the cached value
        value = await cache.get('testKey2');
        console.log("\ntestKey2 before invalidation:", value); // Should print 'testValue to be invalidated'

        // Invalidate cache for a dependency
        await cache.invalidate('testDependency');

        // Introduce a 50ms delay
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Call the get function to retrieve the invalidated value
        value = await cache.get('testKey2');
        console.log("\ntestKey2 after invalidation:", value); // Should print null
        
        console.log('\n====================');
        console.log('Adding additional keys to cache');
        console.log('====================\n');
        
        // Introduce a 50ms delay
        await new Promise(resolve => setTimeout(resolve, 50));

        
        console.log('\n====================');
        console.log('Testing cache.clear');
        console.log('====================\n');
        
        // Clear the entire cache
        await cache.clear();
        
        // Attempt to get the value after clearing cache
        value = await cache.get('testKey');
        console.log("\ntestKey after clear:", value); // Should print null
        
        console.log('\n====================');
        console.log('Testing cache.getSize');
        console.log('====================\n');

        // Add two additional keys to the cache
        await cache.set('additionalKey1', 'value 1', ['testDependency']);
        await cache.set('additionalKey2', 'value 2', []);
        
        // Check the size of the cache
        const size = await cache.getSize();
        console.log("\nCache size:", size); // Should print the size of the cache (number of keys)

        console.log('\n====================');
        console.log('Testing cache.getStringKeySize');
        console.log('====================\n');

        // Check the size of the cache for string keys
        const stringKeySize = await cache.getStringKeySize();
        console.log("\nString key size:", stringKeySize); // Should print the number of string keys in the cache

        // Exit the process
        process.exit(0);
    } catch (error) {
        console.error('\n====================');
        console.error('Error:', error);
        console.error('====================\n');
        // Exit with error code
        process.exit(1);
    }
}

testCache();



