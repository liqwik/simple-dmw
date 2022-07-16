/* --- STATE --- */
export interface DocTypeState {
  items: any[];
  totalItem: number;
  isSubmitting: boolean;
  isLoading: boolean;
  validationErrors: any[];
  serviceError: string;
}
