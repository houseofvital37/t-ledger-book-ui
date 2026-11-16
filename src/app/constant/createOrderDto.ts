export interface createOrderDto {
  customerId: number,
  installmentPlanId: number,
  orderDate?: string,
  totalFinalPrice: number,
  totalAdvance: number,
  totalRemaining: number,
  totalProfit: number,
  status?: string,
  invoiceNo?: string ,
  orderDetails:
    {
       productId: number,
       quantity?: number,
       productPrice: number,
       markupPercentage: number,
       markupAmount: number,
       finalPrice: number,
       advanceAmount: number,
       remainingAmount: number,
       monthlyInstallmentAmount: number,
       profit: number
    }
}