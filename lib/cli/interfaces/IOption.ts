export default interface IOption {
  project: string;
  dependency: ('dev' | 'prod' | 'peer')[];
  ignore: (
    | 'dev-add'
    | 'dev-remove'
    | 'dev-change'
    | 'prod-add'
    | 'prod-remove'
    | 'prod-change'
    | 'peer-add'
    | 'peer-remove'
    | 'peer-change'
  )[];
  config?: string;
  hash?: string;
  json: boolean;
  depth: number;
  gitBinary: string;
  gitBasedir?: string;
}
