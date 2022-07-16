/* --- STATE --- */
export interface DocumentState {
  items: any[];
  itemDetail: any;
  totalItem: number;
  isSubmitting: boolean;
  isLoading: boolean;
  validationErrors: any[];
  serviceError: string;
}
