import { useContext } from 'react';
import FooterContext from './FooterContext';
import LinkRowItem from './LinkRowItem';

export default function LeftLinks() {
  const { leftLinks } = useContext(FooterContext);

  return (
    <div className="d-flex flex-column">
      {leftLinks.map((item, index) => (
        // TODO: Do something better than using the array index here.
        // eslint-disable-next-line react/no-array-index-key
        <LinkRowItem key={index} item={item} />
      ))}
    </div>
  );
}
