import { OptionLeg } from "./utils";

export const calcProfitLoss = (
  price: number,
  { strike_price, type, bid, ask, long_short }: OptionLeg
) =>
  (long_short === "long" ? 1 : -1) *
  (type === "Call"
    ? price > strike_price
      ? price - strike_price - ask
      : -bid
    : price < strike_price
    ? strike_price - price - ask
    : -bid);

export const calcProfitsLosses = (options: OptionLeg[], price: number) =>
  options.reduce((acc, option) => acc + calcProfitLoss(price, option), 0);

// Todo: Find a better price range
const prices = Array.from({ length: 200 }, (_, i) => i);

export function calcProfitLossEvens(options: OptionLeg[]) {
  const profitsLosses = prices.map((price) =>
    calcProfitsLosses(options, price)
  );

  const breakEvens = prices.filter((_, index) =>
    index === 0 || index === profitsLosses.length - 1
      ? false
      : (profitsLosses[index - 1] < 0 && profitsLosses[index + 1] > 0) ||
        (profitsLosses[index - 1] > 0 && profitsLosses[index + 1] < 0)
  );

  return {
    breakEvens,
    maxProfit: Math.max(...profitsLosses),
    maxLoss: Math.min(...profitsLosses),
  };
}
export const getMainChartData = (options: OptionLeg[]) =>
  prices.map((price) => ({
    category: "COMBINED",
    expiryPrice: price,
    profitLoss: calcProfitsLosses(options, price),
  }));

export const getLegChartData = (options: OptionLeg[]) =>
  options
    .map((option, index) =>
      prices.map((price) => ({
        category: (option as any).note || index,
        expiryPrice: price,
        profitLoss: calcProfitLoss(price, option),
      }))
    )
    .flat();
