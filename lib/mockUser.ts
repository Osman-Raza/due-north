export const mockUser = {
  firstName: "Maya",
  lastName: "Chen",
  age: 26,
  income: 58000,
  city: "Hamilton, ON",
  accounts: {
    chequing: { balance: 3847.42, type: "Scotia Preferred Package" },
    savings: { balance: 1200.0, type: "Momentum PLUS Savings" },
    tfsa: { balance: 0, room: 12400, type: "TFSA" },
    rrsp: { balance: 0, room: 10440, type: "RRSP" },
    fhsa: { balance: 0, room: 8000, type: "FHSA" },
  },
  goals: ["Buy a home in 3-4 years", "Build emergency fund"],
  riskTolerance: "moderate",
  hasInvested: false,
};

export const userContextString = `
The user is ${mockUser.firstName}, age ${mockUser.age}, living in ${mockUser.city}.
Annual income: $${mockUser.income.toLocaleString()}.
Account balances:
- Chequing: $${mockUser.accounts.chequing.balance.toLocaleString()}
- Savings: $${mockUser.accounts.savings.balance.toLocaleString()}
- TFSA: $${mockUser.accounts.tfsa.balance} (unused room: $${mockUser.accounts.tfsa.room.toLocaleString()})
- RRSP: $${mockUser.accounts.rrsp.balance} (unused room: $${mockUser.accounts.rrsp.room.toLocaleString()})
- FHSA: $${mockUser.accounts.fhsa.balance} (unused room: $${mockUser.accounts.fhsa.room.toLocaleString()})
Goals: ${mockUser.goals.join("; ")}.
Risk tolerance: ${mockUser.riskTolerance}.
Has invested before: ${mockUser.hasInvested ? "yes" : "no"}.
`.trim();
