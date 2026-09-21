export interface DirectusFile {
  id: string;
  title?: string | null;
  description?: string | null;
  filename_download?: string | null;
  type?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface DirectusResponse<T> {
  data: T;
}

export interface DirectusCollectionResponse<T> {
  data: T[];
}
