type TOptionWithAbsolutePath<T> = T & {
  absolute: {
    project: string;
    gitBaseDir: string;
    packageJsonFileName: string;
  };
};

export default TOptionWithAbsolutePath;
