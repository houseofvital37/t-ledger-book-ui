import { listOfColumns } from "../shared/models/listOfColumns.interface";

export const CustomersColumns: listOfColumns[] = [
    { label: "", variable: 'check', isVisible: true, width: '50px' },
    { label: "Sr.", variable: 'Sr', isVisible: true, width: '50px', class: "text-center" },
    { label: "Name", variable: 'customerName', isVisible: true, width: '180px' },
    { label: "Phone", variable: 'customerPhone', isVisible: true, width: '180px' },
    { label: "CNIC", variable: 'customerCnic', isVisible: true, width: '180px' },
    { label: "Address", variable: 'address', isVisible: true, width: '180px' },
    { label: "City", variable: 'cityName', isVisible: true, width: '180px' },
    { label: "Action", variable: 'action', isVisible: true, width: '100px', class: 'text-center' },
]

export const SaleOrdersColumns: listOfColumns[] = [
    { label: "", variable: 'check', isVisible: true, width: '50px' },
    { label: "Sr.", variable: 'Sr', isVisible: true, width: '50px', class: "text-center" },
    { label: "Invoice No", variable: 'invoiceNo', isVisible: true, width: '180px' },
    { label: "Customer", variable: 'customerName', isVisible: true, width: '180px' },
    { label: "Installment Plan", variable: 'planName', isVisible: true, width: '180px' },
    { label: "Product", variable: 'productName', isVisible: true, width: '180px' },
    { label: "Order Date", variable: 'orderDate', isVisible: true, width: '180px' },
    { label: "Total Price", variable: 'finalPrice', isVisible: true, width: '180px' },
    { label: "Total Advance", variable: 'advanceAmount', isVisible: true, width: '180px' },
    { label: "Remaining Amount", variable: 'remainingAmount', isVisible: true, width: '180px' },
    { label: "Installment", variable: 'monthlyInstallmentAmount', isVisible: true, width: '180px' },
    { label: "Status", variable: 'status', isVisible: true, width: '180px' },
    { label: "Created At", variable: 'createdAt', isVisible: true, width: '180px' },
    { label: "Action", variable: 'action', isVisible: true, width: '100px', class: 'text-center' },
]

export const InstallmentLedgerColumns: listOfColumns[] = [
    { label: "", variable: 'check', isVisible: true, width: '50px' },
    { label: "Sr.", variable: 'Sr', isVisible: true, width: '50px', class: "text-center" },
    { label: "Invoice No", variable: 'invoiceNo', isVisible: true, width: '180px' },
    { label: "Customer", variable: 'customerName', isVisible: true, width: '180px' },
    { label: "Customer Contact", variable: 'customerPhone', isVisible: true, width: '180px' },
    { label: "Installment Plan", variable: 'planName', isVisible: true, width: '180px' },
    { label: "Total Installments", variable: 'totalInstallments', isVisible: true, width: '180px' },
    { label: "Paid Installments", variable: 'paidInstallments', isVisible: true, width: '180px' },
    { label: "Pending Installments", variable: 'pendingInstallments', isVisible: true, width: '180px' },
    { label: "Remaining Amount", variable: 'remainingAmount', isVisible: true, width: '180px' },
    { label: "Order Status", variable: 'status', isVisible: true, width: '180px' },
]

export const InstallmentCollectionColumns: listOfColumns[] = [
    { label: "", variable: 'check', isVisible: true, width: '50px' },
    { label: "Sr.", variable: 'Sr', isVisible: true, width: '50px', class: "text-center" },
    { label: "Invoice No", variable: 'invoiceNo', isVisible: true, width: '180px' },
    { label: "Customer", variable: 'customerName', isVisible: true, width: '180px' },
    { label: "Customer Contact", variable: 'customerPhone', isVisible: true, width: '180px' },
    { label: "Installment Amount", variable: 'installmentAmount', isVisible: true, width: '180px' },
    { label: "Due Date", variable: 'dueDate', isVisible: true, width: '180px' },
    { label: "Status", variable: 'status', isVisible: true, width: '180px' },
]

export const SupplierColumns: listOfColumns[] = [
    { label: "", variable: 'check', isVisible: true, width: '50px' },
    { label: "Sr.", variable: 'Sr', isVisible: true, width: '50px', class: "text-center" },
    { label: "Name", variable: 'supplierName', isVisible: true, width: '180px' },
    { label: "Phone", variable: 'supplierPhone', isVisible: true, width: '180px' },
    { label: "Address", variable: 'address', isVisible: true, width: '180px' },
    { label: "Category", variable: 'supplierCategory', isVisible: true, width: '180px' },
    { label: "City", variable: 'cityName', isVisible: true, width: '180px' },
    { label: "Action", variable: 'action', isVisible: true, width: '100px', class: 'text-center' },
]

export const ProductColumns: listOfColumns[] = [
    { label: "", variable: 'check', isVisible: true, width: '50px' },
    { label: "Sr.", variable: 'Sr', isVisible: true, width: '50px', class: "text-center" },
    { label: "Name", variable: 'productName', isVisible: true, width: '180px' },
    { label: "SKU", variable: 'productSku', isVisible: true, width: '180px' },
    { label: "Sale Price", variable: 'salePrice', isVisible: true, width: '180px' },
    { label: "Purchase Price", variable: 'purchasePrice', isVisible: true, width: '180px' },
    { label: "Category", variable: 'productCategory', isVisible: true, width: '180px' },
    { label: "Supplier", variable: 'supplierName', isVisible: true, width: '180px' },
    { label: "Details", variable: 'productDetail', isVisible: true, width: '180px' },
    { label: "Action", variable: 'action', isVisible: true, width: '100px', class: 'text-center' },
]

export const ProductCategoryColumns: listOfColumns[] = [
    { label: "", variable: 'check', isVisible: true, width: '50px' },
    { label: "Sr.", variable: 'Sr', isVisible: true, width: '50px', class: "text-center" },
    { label: "Product Category", variable: 'productCategory', isVisible: true, width: '180px' },
    { label: "Status", variable: 'status', isVisible: true, width: '180px' },
    { label: "Action", variable: 'action', isVisible: true, width: '100px', class: 'text-center' },
]

export const CategoryInstallmentRuleColumns: listOfColumns[] = [
    // { label: "", variable: 'check', isVisible: true, width: '50px' },
    { label: "Sr.", variable: 'Sr', isVisible: true, width: '50px', class: "text-center" },
    { label: "Installment Rule", variable: 'ruleName', isVisible: true, width: '180px', },
    { label: "Product Category", variable: 'productCategory', isVisible: true, width: '180px', },
    { label: "Installment Plan", variable: 'installmentPlan', isVisible: true, width: '100px', },
    { label: "Percentage", variable: 'percentage', isVisible: true, width: '100px', },
    { label: "Advance", variable: 'advance', isVisible: true, width: '100px', },
    { label: "Action", variable: 'action', isVisible: true, width: '100px', class: 'text-center' },
]