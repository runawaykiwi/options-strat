export type OptionLeg = {
  strike_price: number;
  type: string;
  bid: number;
  ask: number;
  long_short: string;
  expiration_date: string;
};

export type LocalOptionLeg = Partial<OptionLeg> & { id: number, note?: string };

export const defaultData: LocalOptionLeg[] = [
  {
    strike_price: 100,
    type: "Call",
    bid: 10.05,
    ask: 12.04,
    long_short: "long",
    expiration_date: "2025-12-17T00:00:00Z",
    note: "Gold"
  },
  {
    strike_price: 102.5,
    type: "Call",
    bid: 12.1,
    ask: 14,
    long_short: "long",
    expiration_date: "2025-12-17T00:00:00Z",
    note: "Silver"
  },
  {
    strike_price: 103,
    type: "Put",
    bid: 14,
    ask: 15.5,
    long_short: "short",
    expiration_date: "2025-12-17T00:00:00Z",
    note: "Gas"
  },
  {
    strike_price: 105,
    type: "Put",
    bid: 16,
    ask: 18,
    long_short: "long",
    expiration_date: "2025-12-17T00:00:00Z",
    note: "Oil"
  },
].map((obj, id) => ({ ...obj, id }));
