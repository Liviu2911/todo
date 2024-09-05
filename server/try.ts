const tryFunc = async (
  callback: () => any
): Promise<
  { data: any; error: undefined } | { error: any; data: undefined }
> => {
  try {
    const res = await callback();
    return {
      data: res,
      error: undefined,
    };
  } catch (e) {
    return {
      error: e,
      data: undefined,
    };
  }
};

export default tryFunc;
