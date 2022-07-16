/* --- STATE --- */
export interface UserState {
  items: any[];
  itemDetail: any;
  totalItem: number;
  isSuccess: boolean;
  isSubmitting: boolean;
  isLoading: boolean;
  hasNextPage: boolean;
  validationErrors: any[];
  serviceError: string;
}
