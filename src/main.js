/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   // @TODO: Расчет выручки от операции
   const {discount, sale_price, quantity} = purchase;

}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    // @TODO: Расчет бонуса от позиции в рейтинге
    const { profit } = seller;
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
    // @TODO: Проверка входных данных
    if (!data
        ||!Array.isArray(data.sellers)
        ||!Array.isArray(data.customers)
        ||!Array.isArray(data.products)
        ||data.sellers.length === 0
        ||data.customers.length === 0
        ||data.products.length ===0
    ) {
        throw new Error('Некорректные входные данные');
    }
    // @TODO: Проверка наличия опций
    const {calculateRevenue, calculateBonus } = options;
    if (typeof calculateRevenue === 'undefined'
        ||typeof calculateBonus === 'undefined'
        ||typeof calculateRevenue !== 'function'
        ||typeof calculateBonus !== 'function'
    ){
        throw new Error('Функции не определены');
    }
    // @TODO: Подготовка промежуточных данных для сбора статистики
    const sellerStats = data.sellers.map(seller => ({
        id: seller.id,
        name: `${seller.first_name} ${seller.last_name}`,
        revenue: 0,                     // выручка
        profit: 0,                      //прибыль
        sales_count: 0,                 //объем продаж
        products_sold: {}       //количество всех проданных товаров
    }));

    console.log(data.sellers, sellerStats);
    /*console.log(typeof data.sellers, typeof sellerStats); */
    // @TODO: Индексация продавцов и товаров для быстрого доступа
    
    const productIndex = Object.fromEntries(
        data.products.map(product => [product.sku, product])
    );
    const sellerIndex = sellerStats.reduce((result, seller) => ({
        ...result,
        [seller.id]: seller
    }),{});
    /* const sellerIndex = Object.fromEntries(sellerStats.map(seller => [seller.id, seller])); */
    console.log(productIndex, sellerIndex);
    // @TODO: Расчет выручки и прибыли для каждого продавца

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями
}
