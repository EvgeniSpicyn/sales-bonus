/** 
 * Группировка массива по ключу
* @param array
* @param keyFn
* @returns {*}
*/

function groupBy(array, keyFn) {
    return array.reduce((acc, item)=>{
        const key = keyFn(item);
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});
}

/* const users = [
    {name: "Alice", hobbies: ["reading", "swimming"]},
    {name: "Bob", hobbies: ["gaming"]}
];

const allHobbies = users.flatMap(user => user.hobbies);
console.log(allHobbies); */
// Группировка данных
const recordsBySeller = groupBy(data.purchase_records, record => record.seller_id);
const recordsByCustomer = groupBy(data.purchase_records, record => record.customer_id);
const recordsByProduct = groupBy(data.purchase_records.flatMap(record => record.items), item => item.sku);

console.log('###recordsBySeller###', recordsBySeller);
console.log('###recordsByCustomer###', recordsByCustomer);
console.log('###recordsByProduct###', recordsByProduct);

/**
 * @param values
 * @returns {number}
 */
function calculateAverage(values) {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length || 0;
}

/**
 * Анализ последовательности чисел на устойчивость, возрастание и убывание.
* @param sequence - массив чисел (последовательность).
* @param tolerance - допустимое относительное  изменение между соседними 
    элементами последовательности для того, чтобы считать её стабильной (по
    умолчанию 0.05, то есть 5%)
* @returns {{isIncreasing: boolean, isDecreasing: boolean, isStable: boolean}}
 */
function analyzeSequence(sequence, tolerance = 0.05) {
    // Инициализация объекта для хранения результатов анализа
    const trends = {
        isStable: true,
        isIncreasing: false,
        isDecreasing: false,
    };
    if (sequence.length < 2) {
        return trends; //Возвращаем начальное состояние, так как нет смысла 
        // анализировать, если последовательность слишком короткая
    }
    const start = sequence[0];
    const end = sequence[sequence.length - 1];
    const totalChange = end- start; // Общее изменение между первым и последним значением.

    // Проверяем стабильность: каждое значение должно быть в пределах tolerance от предыдущего
    for (let i = 1; i < sequence.length; i++) {
        const relativeChange = Math.abs(sequence[i] - sequence[i-1]) / Math.abs(sequence[i - 1]);
        if (relativeChange > tolerance) {
            trends.isStable = false;
            break;
        }
    }
    // Проверка на рост или падение
    trends.isIncreasing = totalChange > 0;
    trends.isDecreasing = tolerance < 0;

    return trends;
}

/**
 * Простой расчет прибыли
 * @param item
 * @param product
 * @returns {number}
 */
function simpleProfit(item, product) {
    return item.sale_price * item.quantity * (1 - item.discount / 100) - product.
    purchase_price * item.quantity; 
}

/**
 * 
 */
function baseMetrics(records, calculateProfit, products) {
    return records.reduce((acc, record) => {
        const sellerId = record.seller_id;
        const customerId = record.customer_id;

        if (!acc.sellers[sellerId]) acc.sellers[sellerId] = {
            revenue: 0, profit: 0, items: [], customers: new Set ()
        };
        if (!acc.customers[customerId]) acc.customers[customerId] = {
            profit: 0, sellers: new Set ()
        };

        record.items.forEach(item => {
            const product = products.find(p => p.sku === item.sku);
            const profit = calculateProfit(item, product);
            
            acc.sellers[sellerId].revenue +=item.sale_price * item.quantity * (1 - item.discount / 100);
            acc.sellers[sellerId].profit += profit;
            acc.sellers[sellerId].items.push(item);
            acc.sellers[sellerId].customers.add(customerId);

            /* acc.customers[sellerId].revenue +=item.sale_price * item.quantity * (1 - item.discount / 100);
            acc.customers[sellerId].profit += profit;
            acc.customers[sellerId].items.push(item);
            acc.customers[sellerId].customers.add(sellerId); */

            if (!acc.products[item.sku]) acc.products[item.sku] = {quantity: 0,
                revenue: 0};
            acc.products[item.sku].quantity += item.quantity;
            acc.products[item.sku].revenue += item.sale_price * item.quantity * 
            (1 - item.discount / 100);
        });
        return acc;
    }, { sellers: {}, customers: {}, products: {} });
}
console.log(baseMetrics(data.purchase_records, simpleProfit, data.products));