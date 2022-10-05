export default interface IChunk {
  action: 'start' | 'end' | 'data';
  data: string;
}
