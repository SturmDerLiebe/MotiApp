function typeCheckEnvVariable(
  envVariable: string | undefined,
  name: string,
): string {
  return (
    envVariable ??
    (function () {
      throw new Error(`The environment vairiable ${name} was not set`);
    })()
  );
}

export { typeCheckEnvVariable };
