export interface IDataSetResponse {
  ANIO_MIN: string;
  DEPARTAMENTO_RESIDENCIA: string;
  EVENTO: string;
  GRUPO_ETARIO: string;
  ID_DEPTO_INDEC_RESIDENCIA: string;
  ID_GRUPO_ETARIO: string;
  ID_PROV_INDEC_RESIDENCIA: string;
  PROVINCIA_RESIDENCIA: string;
  SEPI_MIN: string;
  Total: string;
}

export interface IData {
  year: string;
  department: string;
  event: string,
  age_group: string;
  age_group_id: string;
  province: string;
  total: number;
}
