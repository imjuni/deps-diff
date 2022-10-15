import { TCHUNK_ACTION } from '@modules/interfaces/TCHUNK_ACTION';

export default interface IChunk {
  action: TCHUNK_ACTION;
  data: string;
}
