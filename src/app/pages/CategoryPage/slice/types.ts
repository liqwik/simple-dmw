/* --- STATE --- */
export interface CategoryState {
  items: any[];
  totalItem: number;
  isSubmitting: boolean;
  isLoading: boolean;
  validationErrors: any[];
  serviceError: string;
}
