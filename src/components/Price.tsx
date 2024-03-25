interface PriceProps {
  currency: string;
  num: number;
  numSize: string;
}

function Price({ currency, num, numSize }: PriceProps): JSX.Element {
  return (
    <>
      {currency}<span className={numSize}>{num}</span>
    </>
  );
}

export default Price;
