/* --- STATE --- */
export interface InstitutionState {
  items: any[];
  totalItem: number;
  isSubmitting: boolean;
  isLoading: boolean;
  validationErrors: any[];
  serviceError: string;
  searchTerm: string;
}
