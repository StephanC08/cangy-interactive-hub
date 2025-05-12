
// Types for the investment simulation
export interface InvestmentDetails {
  propertyType: string;
  location: string;
  financingMethod: string;
  loanYears: number;
  downPayment: number;
  strategy: string;
  management: string;
}

export interface LocationDetail {
  value: string;
  label: string;
  yield: number;
  growth: number;
  risk: number;
}

export interface PropertyTypeDetail {
  value: string;
  label: string;
  yield: number;
  risk: number;
}
