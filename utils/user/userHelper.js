
function normalizeVisitedCoffeeShops(user) {
    const uniqueVisitedCoffeeShops = [];
    user.additionalDetails.visitedCoffeeShops.forEach((shopId) => {
        if (shopId) {
            const existingShop = uniqueVisitedCoffeeShops.find((shop) =>
                shop.equals(shopId)
            );
            if (existingShop) {
                ++existingShop.count;
            } else {
                uniqueVisitedCoffeeShops.push({ shopId, count: 1 });
            }
        }
    });
    user.additionalDetails.visitedCoffeeShops = uniqueVisitedCoffeeShops;
}

// Method to normalize ordered products to ensure unique orderId and update counts
function normalizeOrderedProducts(user) {
    const uniqueOrderedProducts = [];
    user.additionalDetails.orderedProducts.forEach((productId) => {
        if (productId) {
            const existingProduct = uniqueOrderedProducts.find((product) =>
                product.productId.equals(productId)
            );
            if (existingProduct) {
                ++existingProduct.count;
            } else {
                uniqueOrderedProducts.push({ productId, count: 1 });
            }
        }
    });
    user.additionalDetails.orderedProducts = uniqueOrderedProducts;
}

// Method to calculate the top 3 most ordered products
function calculateMostOrderedThreeProducts(user) {
    if (user.additionalDetails.orderedProducts.length > 0) {
        // Sort products by count in descending order
        const sortedProducts = user.additionalDetails.orderedProducts.sort(
            (a, b) => b.count - a.count
        );

        // Take the top three products
        user.additionalDetails.mostOrderedThreeProducts = sortedProducts.slice(0, 3).map(item => item.productId);
    } else {
        user.additionalDetails.mostOrderedThreeProducts = []; // Set to empty array if none
    }
}

// Method to calculate the most visited coffee shop
function calculateMostGoingCoffeeShop(user) {
    if (user.additionalDetails.visitedCoffeeShops.length > 0) {
        const sortedShops = user.additionalDetails.visitedCoffeeShops.sort(
            (a, b) => b.count - a.count
        );

        user.additionalDetails.mostGoingCoffeeShop = sortedShops[0].shopId; 
    } else {
        user.additionalDetails.mostGoingCoffeeShop = null;
    }
}

export {
    normalizeVisitedCoffeeShops,
    normalizeOrderedProducts,
    calculateMostOrderedThreeProducts,
    calculateMostGoingCoffeeShop
};