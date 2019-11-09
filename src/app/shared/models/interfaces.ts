export interface CommonPaginationDto {
  page: string;
  perPage: string;
  sortBy: string;
}

export interface CommonResponseDto {
  items: any[];
  total_count: number;
}
