
export function useConfigVariables() {
  const config = useRuntimeConfig()
  // eslint-disable-next-line no-console
  console.log('Runtime Config in Composables', config)
  return config
}
