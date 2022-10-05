import IBaseOption from '@configs/interfaces/IBaseOption';

export default interface IMarkdownOption extends IBaseOption {
  type: 'markdown';
  depth: number;
}
