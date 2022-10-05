export default interface IBaseOption {
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
  prevHash?: string;
  nextHash?: string;
  json: boolean;
  gitBinary: string;
  gitBasedir?: string;
}
