/**
 * Helps rendering the same Component {Qlink amount} times.
 * @param renderCallback - gets called before being added to the returned Array. Needs to use a **key** or React will throw a warning!
 */
export function renderTimes(
  amount: number,
  renderCallback: (key: number) => React.JSX.Element,
) {
  const RESULT: React.JSX.Element[] = [];
  for (let i: number = 1; i <= amount; i++) {
    RESULT.push(renderCallback(i));
  }
  return RESULT;
}
