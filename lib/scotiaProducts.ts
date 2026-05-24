export const scotiaProducts = [
  {
    id: "smart-essentials",
    name: "Scotia Smart Investor — Essentials Portfolio",
    type: "Managed Portfolio",
    minInvestment: 25,
    fee: "Built into MER, no separate fee",
    bestFor: "First-time investors who want hands-off, diversified investing",
    accounts: ["TFSA", "RRSP", "FHSA", "Non-registered"],
  },
  {
    id: "itrade-vfv",
    name: "Scotia iTRADE — VFV (S&P 500 ETF)",
    type: "Self-Directed ETF",
    minInvestment: 50,
    fee: "$0 commission on ETF buys",
    bestFor: "Investors comfortable picking their own ETFs",
    accounts: ["TFSA", "RRSP", "FHSA", "Non-registered"],
  },
  {
    id: "fhsa-account",
    name: "Scotia FHSA",
    type: "First Home Savings Account",
    minInvestment: 0,
    fee: "No account fee",
    bestFor: "First-time home buyers — tax deductible AND tax-free withdrawals",
    accounts: ["FHSA"],
  },
  {
    id: "gic-cashable",
    name: "Scotia 1-Year Cashable GIC",
    type: "Guaranteed Investment Certificate",
    minInvestment: 500,
    fee: "None",
    bestFor: "Risk-averse savers who want guaranteed return + flexibility",
    accounts: ["TFSA", "RRSP", "Non-registered"],
  },
];

export const productCatalogString = scotiaProducts
  .map(
    (p) =>
      `- ${p.name} (${p.type}): min $${p.minInvestment}, ${p.fee}. Best for: ${p.bestFor}. Available in: ${p.accounts.join(", ")}.`
  )
  .join("\n");
